import {
  avrInstruction,
  AVRTimer,
  CPU,
  timer0Config,
  // timer1Config,
  // timer2Config,
  AVRIOPort,
  AVRUSART,
  portBConfig,
  // portCConfig,
  // portDConfig,
  usart0Config,
} from "avr8js";
import { loadHex } from "./intelhex";
import { MicroTaskScheduler } from "./task-scheduler";

// ATmega328p params
const FLASH = 0x8000;

export class AVRRunner {
  readonly program = new Uint16Array(FLASH);
  readonly cpu: CPU;
  readonly timer0: AVRTimer;
  readonly timer1: AVRTimer;
  readonly timer2: AVRTimer;
  readonly portB: AVRIOPort;
  readonly portC: AVRIOPort;
  readonly portD: AVRIOPort;
  readonly usart: AVRUSART;
  readonly speed = 16e6; // 16 MHZ
  readonly workUnitCycles = 500000;
  readonly taskScheduler = new MicroTaskScheduler();

  constructor(hex: string) {
    loadHex(hex, new Uint8Array(this.program.buffer));
    this.cpu = new CPU(this.program, 0x2200);
    this.timer0 = new AVRTimer(this.cpu, {
      ...timer0Config,
      compAInterrupt: 0x02a,
      compBInterrupt: 0x02c,
      ovfInterrupt: 0x02e,
    });
    this.portB = new AVRIOPort(this.cpu, portBConfig);
    this.usart = new AVRUSART(this.cpu, usart0Config, this.speed);
    this.taskScheduler.start();
  }

  // CPU main loop
  execute(callback: (cpu: CPU) => void) {
    const cyclesToRun = this.cpu.cycles + this.workUnitCycles;
    while (this.cpu.cycles < cyclesToRun) {
      avrInstruction(this.cpu);
      this.timer0.tick();
      this.usart.tick();
    }

    callback(this.cpu);
    this.taskScheduler.postTask(() => this.execute(callback));
  }

  stop() {
    this.taskScheduler.stop();
  }
}
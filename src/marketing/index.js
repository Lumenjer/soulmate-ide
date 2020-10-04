import "./marketing.pcss";

import React from "react";
import { AiFillApple, AiFillWindows } from "react-icons/ai";

import examples from "~/welcome/examples";

import Example from "./example";
import hand from "./hand.jpg";
import logo from "./logo.png";
import theboyz from "./theboyz.jpg";

function isMacintosh() {
  return navigator.platform.indexOf("Mac") > -1;
}

function isMobile() {
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  );
}

export default function MarketingPage() {
  const [index, setIndex] = useState(0);

  return (
    <div className="full-width">
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-screen-xl">
          <div className="relative z-10 bg-white pb- sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-48">
            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a aria-label="Home" href="#">
                      <img
                        alt="Logo"
                        className="w-auto h-8 sm:h-10"
                        src={logo}
                      />
                    </a>
                    <div className="flex items-center -mr-2 md:hidden">
                      <button
                        aria-haspopup="true"
                        aria-label="Main menu"
                        className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        id="main-menu"
                        type="button"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M4 6h16M4 12h16M4 18h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <main className="px-4 mx-auto mt-10 max-w-screen-xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-10 sm:text-5xl sm:leading-none md:text-6xl">
                  Soulmate
                  <br />
                  <span className="text-4xl text-purple-600">
                    A FastLED ESP32 ecosystem
                  </span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Soulmate is the easiest way to work with LEDs. Whether you’re
                  building an LED panel, lighting your room with an LED strip,
                  or just writing C++, try Soulmate free today.
                </p>

                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Made by a bunch of dudes in California.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            alt
            className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={theboyz}
          />
        </div>
      </div>

      <div className="overflow-hidden bg-white">
        <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 right-3/4" />

          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative mb-8 lg:mb-0 lg:row-start-1 lg:col-start-1">
              <div className="relative mx-auto text-base max-w-prose lg:max-w-none">
                <figure>
                  <div className="relative pb-7/12 lg:pb-0">
                    {/* <img
                      alt
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-lg shadow-lg lg:static lg:h-auto"

                      src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                    /> */}
                    <img
                      alt
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-lg shadow-lg lg:static lg:h-auto"
                      height={1376}
                      src={hand}
                      // width={1184}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div>
              <div className="mx-auto mb-4 text-base max-w-prose lg:max-w-none">
                <p className="text-base font-semibold tracking-wide text-purple-600 uppercase leading-6">
                  How it works
                </p>
                <h1 className="mt-2 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 leading-8 sm:text-4xl sm:leading-10">
                  Soulmate. LEDS reimagined.
                </h1>
              </div>
              <div className="mx-auto text-base max-w-prose lg:max-w-none">
                <p className="mb-5 text-lg text-gray-500 leading-7">
                  Soulmate is a new system for building LED projects. Just fire
                  up the Soulmate IDE, connect your ESP32, and get started.
                </p>
              </div>
              <div className="mx-auto text-gray-500 prose lg:max-w-none lg:row-start-1 lg:col-start-2">
                <p>
                  Flashing with the Soulmate firmware makes everything easy, so
                  you can just write cool patterns.
                </p>
                <ul>
                  <li className="text-left">
                    Bluetooth LE connection - no pairing!
                  </li>
                  <li className="text-left">
                    WiFi connection - over-the-air updates
                  </li>
                  <li className="text-left">
                    Compiles in the cloud - fast, secure, and super-easy
                  </li>
                </ul>
                <p>
                  Building your LEDs with Soulmate means you can use the
                  Soulmate mobile app to control your art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200">
        <div className="w-10/12 px-4 py-16 pb-6 mx-auto max-w-screen-xl sm:py-24 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-row mb-8 md:mb-2 md:px-6">
            <div>
              <div className="text-base max-w-prose lg:max-w-none">
                <p className="font-semibold tracking-wide text-purple-600 uppercase leading-6">
                  Demo time
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 leading-8 sm:text-4xl sm:leading-10">
                  The Soulmate IDE
                </h1>
              </div>

              <div className="mx-auto mt-3 text-gray-500 prose lg:max-w-none lg:row-start-1 lg:col-start-2">
                <p>
                  Try writing your own FastLED pattern here. Press CMD-S to
                  save.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center ml-auto">
              <nav className="relative z-0 inline-flex shadow-sm">
                <a
                  aria-label="Previous"
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer select-none rounded-l-md leading-5 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  onClick={() => index > 0 && setIndex(index - 1)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                  Previous
                </a>
                <a
                  aria-label="Next"
                  className="inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer select-none rounded-r-md leading-5 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  onClick={() =>
                    setIndex(index + 1 >= examples.length ? 0 : index + 1)
                  }
                >
                  Next
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
          <Example className="my-8" code={examples[index]} key={index} />
        </div>
      </div>

      {/*
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
*/}
      <div className="bg-gray-50">
        <div className="px-4 py-12 mx-auto max-w-screen-xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-9 sm:text-4xl sm:leading-10">
            Ready to dive in?
            <br />
            <span className="text-purple-600">
              Open the Soulmate IDE to get started.
            </span>
          </h2>
          <div className="flex mt-8 lg:flex-shrink-0 lg:mt-0 space-x-4">
            <div className="inline-flex shadow rounded-md">
              <a
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-purple-600 border border-transparent leading-6 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                href="https://editor.soulmatelights.com"
              >
                Open the web editor
              </a>
            </div>
            {!isMobile() && (
              <div className="shadow rounded-md">
                <a
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-purple-600 bg-white border border-transparent leading-6 rounded-md hover:text-purple-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  href={
                    isMacintosh()
                      ? "https://editor.soulmatelights.com/download/mac"
                      : "https://editor.soulmatelights.com/download/windows"
                  }
                >
                  {isMacintosh() ? (
                    <AiFillApple className="mr-2" />
                  ) : (
                    <AiFillWindows className="mr-2" />
                  )}
                  Download the desktop app
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-10/12 px-4 py-8 mx-auto max-w-screen-xl sm:py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 leading-9">
          Frequently asked questions
        </h2>
        <div className="px-12 mt-12">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 col-gap-8 sm:row-gap-12 lg:grid-cols-3">
            <div className="px-4 mb-6 space-y-2">
              <dt className="text-lg font-medium text-gray-900 leading-6">
                What do I need to get started?
              </dt>
              <dd className="text-base text-gray-500 leading-6">
                To write LED patterns, all you need is the{" "}
                <a href="https://editor.soulmatelights.com/">Soulmate IDE.</a>{" "}
                Once you’ve got some patterns, just hook up your ESP32. We like
                the{" "}
                <a href="https://m5stack.com/products/atom-lite-esp32-development-kit">
                  M5 Atom Lite
                </a>{" "}
                - but any ESP32 will work.
              </dd>
            </div>
            <div className="px-4 mb-6 space-y-2">
              <dt className="text-lg font-medium text-gray-900 leading-6">
                What language does Soulmate use?
              </dt>
              <dd className="text-base text-gray-500 leading-6">
                Soulmate patterns are made in C++, using the amazing{" "}
                <a href="http://github.com/fastled/fastled">FastLED library</a>.
                But don’t worry - we’ve made a{" "}
                <a href="https://editor.soulmatelights.com/tutorial">
                  tutorial
                </a>{" "}
                to help you get started.
              </dd>
            </div>
            <div className="px-4 mb-6 space-y-2">
              <dt className="text-lg font-medium text-gray-900 leading-6">
                How many LEDs can I control?
              </dt>
              <dd className="text-base text-gray-500 leading-6">
                Good question! We’ve tested up to 1200 LEDs from a single ESP32.
              </dd>
            </div>
            <div className="px-4 mb-6 space-y-2">
              <dt className="text-lg font-medium text-gray-900 leading-6">
                What does it cost?
              </dt>
              <dd className="text-base text-gray-500 leading-6">
                Soulmate firmware is free and open-source, and we plan to keep
                it that way.
              </dd>
            </div>
            <div className="px-4 mb-6 space-y-2">
              <dt className="text-lg font-medium text-gray-900 leading-6">
                Where can I buy a Soulmate?
              </dt>
              <dd className="text-base text-gray-500 leading-6">
                Thanks for asking! You can buy a Soulmate from{" "}
                <a href="https://shop.soulmatelights.com/">
                  the Soulmate Store
                </a>{" "}
                - buying a Soulmate helps keep the compiler servers running.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <footer className="bg-white">
        <div className="px-4 py-12 mx-auto max-w-screen-xl sm:px-6 lg:py-16 lg:px-8">
          <div className="pt-8 mt-12 border-t border-gray-200">
            <p className="text-base text-gray-400 leading-6 xl:text-center">
              © 2020 Soulmate Lights, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

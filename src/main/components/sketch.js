import classnames from "classnames";

const Sketch = ({ sketch, className, autoPlay, width = 24, ...rest }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (autoPlay) {
      setTimeout(videoRef.current.play);
    }
  }, []);

  return (
    <div
      className={classnames(
        className,
        "col-span-1 flex flex-col text-center bg-white rounded-lg shadow overflow-hidden",
        `w-${width}`,
        "dark-mode:border dark-mode:border-gray-800"
      )}
      {...rest}
    >
      <div className={`block w-${width} h-${width} bg-black`}>
        <video
          ref={videoRef}
          style={{ transform: "rotate(180deg)" }}
          muted
          loop
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => e.target.pause()}
        >
          <source
            id="media-source"
            src={`${sketch.video_url}#t=0.5`}
            type="video/mp4"
          />
        </video>
      </div>
      <div className="p-1 dark-mode:bg-gray-800 text-gray-900 dark-mode:text-white">
        <h3 className="text-xs leading-5 font-medium truncate">
          {sketch.name}
        </h3>
      </div>
    </div>
  );
};

export default Sketch;
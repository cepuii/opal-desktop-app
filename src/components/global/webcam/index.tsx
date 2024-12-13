import { useEffect, useRef } from "react";

const Webcam = () => {
  const camElement = useRef<HTMLVideoElement | null>(null);
  const streamWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (camElement.current) {
      camElement.current.srcObject = stream;
      await camElement.current.play();
    }
  };

  useEffect(() => {
    streamWebcam();
  }, []);

  return (
    <video
      ref={camElement}
      className="h-screen draggable object-cover rounded-full border-2 relative aspect-square border-slate-400"
    ></video>
  );
};

export default Webcam;

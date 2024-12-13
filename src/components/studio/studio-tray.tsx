import { onStopRecording, selectSources, startRecording } from "@/lib/recorder";
import { cn, videoRecordingTime } from "@/lib/utils";
import { Cast, Pause, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SourcesProps = {
  screen: string;
  id: string;
  audio: string;
  preset: "HD" | "SD";
  plan: "PRO" | "FREE";
};

const StudioTray = () => {
  const [preview, setPreview] = useState(false);
  const [onTimer, setOnTimer] = useState<string>("00:00:00");
  const [count, setCount] = useState(0);
  const [onSources, setOnSources] = useState<SourcesProps | undefined>(
    undefined
  );
  const [recording, setRecording] = useState(false);
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const initialTime = new Date();

  window.ipcRenderer.on("profile-received", (event, payload) => {
    console.log(event);
    setOnSources(payload);
  });

  const clearTime = () => {
    setCount(0);
  };
  // WIP: add resize behavior
  //useEffect(() => {
  //  resizeWindow(preview);
  //  return () => resizeWindow(preview);
  //}, [preview]);

  useEffect(() => {
    if (onSources && onSources.screen) selectSources(onSources, videoElement);

    return () => {
      selectSources(onSources!, videoElement);
    };
  }, [onSources]);

  useEffect(() => {
    if (!recording) return;
    const recordTimeInterval = setInterval(() => {
      const time = count + (new Date().getTime() - initialTime.getTime());
      setCount(time);
      const recordingTime = videoRecordingTime(time);
      if (onSources?.plan === "FREE" && recordingTime.minute == "05") {
        setRecording(false);
        clearTime();
        onStopRecording();
      }
      setOnTimer(recordingTime.length);
      if (time <= 0) {
        setOnTimer("00:00:00");
        clearInterval(recordTimeInterval);
      }
    }, 1);
    return () => clearInterval(recordTimeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);

  if (!onSources) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-end gap-y-5 h-screen">
      <video
        autoPlay
        ref={videoElement}
        className={cn("w-6/12 border-2 self-end", preview ? "hidden" : "")}
      />
      <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-[#171717] draggable border-white/40">
        <div
          {...(onSources && {
            onClick: () => {
              setRecording(true);
              startRecording(onSources);
            },
          })}
          className={cn(
            "non-draggable rounded-full cursor-pointer relative hover:opacity-80",
            recording ? "bg-red-500 w-6 h-6" : "bg-red-400 w-8 h-8"
          )}
        >
          {recording && (
            <span className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-white">
              {onTimer}
            </span>
          )}
        </div>
        {!recording ? (
          <Pause
            className="non-draggable opacity-50"
            size={32}
            fill="#fff"
            stroke="none"
          />
        ) : (
          <Square
            size={32}
            className="non-draggable cursor-pointer hover:scale-110 transform transition duration-150"
            fill="#FFF"
            stroke="#FFF"
            onClick={() => {
              setRecording(false);
              clearTime();
              onStopRecording();
            }}
          />
        )}
        <Cast
          size={32}
          fill="#fff"
          stroke="#FFF"
          className="non-draggable cursor-pointer hover:opacity-60"
          onClick={() => setPreview((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default StudioTray;

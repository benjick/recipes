import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { setInterval, clearInterval } from "worker-timers";
import useSound from "use-sound";
import bells from "../assets/bells.wav";
import { classNames } from "../src/helpers";

function msToTime(s: number) {
  const prefix = s < 0 ? "-" : "";
  s = Math.abs(s);
  function pad(n: number, l = 2) {
    return n.toString().padStart(l, "0");
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return prefix + pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
}

function useTimer(minutes: number) {
  const minute = 1000 * 60;
  const [playSound] = useSound(bells);
  const [ms, setMs] = useState(() => minutes * minute);
  const [playing, setPlaying] = useState(false);

  const timer = useRef<number>();
  const didPlay = useRef(false);

  function addTime() {
    const toAdd = minutes * (minutes < 1 ? 0.25 : 0.1) * minute;
    didPlay.current = false;
    setMs((state) => Math.max(0, state) + toAdd);
  }

  useEffect(() => {
    if (ms < 0 && !didPlay.current) {
      playSound();
      didPlay.current = true;
    }
  }, [ms, playSound]);

  function play() {
    const interval = 100;
    setPlaying(true);
    timer.current = setInterval(() => {
      setMs((state) => state - interval);
    }, interval);
  }

  function pause() {
    setPlaying(false);
    if (timer.current) {
      clearInterval(timer.current);
    }
  }

  function reset() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setMs(minutes * minute);
    setPlaying(false);
  }

  return {
    timeleft: msToTime(ms),
    ms,
    addTime,
    play,
    pause,
    playing,
    reset,
  };
}

export const Timer: React.FC<{ minutes: number }> = ({ minutes }) => {
  const { timeleft, play, pause, playing, addTime, reset } = useTimer(minutes);
  return (
    <div
      className={classNames(
        "inline-block bg-indigo-500 rounded-full mt-4",
        playing ? "" : ""
      )}
    >
      <div className="relative flex content-between space-x-3">
        <div>
          {playing ? (
            <button
              onClick={pause}
              className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
            >
              <PauseIcon className="text-white w-7 h-7" aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={play}
              className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
            >
              <PlayIcon className="text-white w-7 h-7" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="flex items-center">
          <p className="font-mono text-sm text-white">{timeleft}</p>
        </div>
        <button
          onClick={addTime}
          className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
        >
          <PlusCircleIcon className="text-white w-7 h-7" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

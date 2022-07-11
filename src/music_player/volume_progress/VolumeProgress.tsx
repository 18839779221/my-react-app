import { useRef } from "react";
import "./VolumeProgress.css";

export function VolumeProgress(props: {on: boolean}) {

  let progressTotal = useRef<HTMLDivElement>(null)

  function onOff(event: React.FocusEvent, on: boolean) {
    let target = event.target as HTMLDivElement; 
    if (on) {
      target.style.display = 'block';
    } else {
      target.style.display = 'none';
    }
  }

  return (
    <div className="volume-progress-total" ref={progressTotal}>
      <div
        className="volume-progress-current"
        //   style={{ width: `${getProgress()}` }}
      ></div>
      <span
        className="volume-progress-indicator"
        //   style={{ left: `calc(${getProgress()} - 4px)` }}
      ></span>
    </div>
  );
}

import { useMagicColor } from "./useMagicColor";
import "./style.css";

export default function Circle() {
  const color = useMagicColor();

  return (
    <div className="square circle" style={{ backgroundColor: color }}>
      Circle
    </div>
  );
}

import { useEffect, useRef } from "react";
import css from "../styles/Canvas";

const Canvas = css();

const A = Math.floor(Math.random() * 5);
const B = Math.floor(Math.random() * 5);
const C = Math.floor(Math.random() * 5);

const Exercise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(canvas.width / 2, 0, 0, canvas.height);
    ctx.strokeRect(0, canvas.width / 2, canvas.width, 0);

    ctx.beginPath();
    ctx.moveTo(0, (A * 0 ** 2) + (B * 0) + C);

    for (let i = 1; i < canvas.width; i++) {
      const x = i; 
      const y = (A * x ** 2) - (B * x) + C;
      console.log(y);
      
      ctx.lineTo(x, y);
    }

    ctx.stroke();

  }, []);

  return <Canvas ref={canvasRef}></Canvas>;
};

export default Exercise;

import { useEffect, useRef } from "react";
import css from "../styles/Canvas";

const Canvas = css();

function DrawGraph(canvas:HTMLCanvasElement ,ctx: CanvasRenderingContext2D) {
  const A = Math.floor(Math.random() * 10);
  const B = Math.floor(Math.random() * 10);
  const C = B / 2;
  console.log({A, B, C})

  if (A == 0) {
    DrawGraph(canvas, ctx);
    return;
  }
  
  const scaleFactor = 25;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  let x = -canvas.width / 2;
  let y = 0;
  ctx.moveTo(x, A * x ** 2 + B * x + C);
  while (x < canvas.width / 2) {
    x += 0.1;
    y = A * x ** 2 + B * x + C;
    ctx.lineTo(x * scaleFactor, -y * scaleFactor);
  }
  ctx.stroke();
}

const Exercise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

  DrawGraph(canvas, ctx);
    
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(-canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -canvas.height / 2);
  ctx.lineTo(0, canvas.height / 2);
  ctx.stroke();
  }, []);

  return <Canvas ref={canvasRef}></Canvas>;
};

export default Exercise;

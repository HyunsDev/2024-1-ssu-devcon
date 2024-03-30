import { useEffect, useRef } from "react";

class GradientAnimation {
  cnv: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  w: number;
  h: number;
  circlesNum: number;
  minRadius: number;
  maxRadius: number;
  speed: number;
  opacity: number;

  circles: Circle[];

  isPlay: boolean;
  loopId?: number;

  constructor(cnv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.cnv = cnv;
    this.ctx = ctx;

    this.w = cnv.width;
    this.h = cnv.height;

    this.circlesNum = 15;
    this.minRadius = 400;
    this.maxRadius = 400;
    this.speed = 0.005;

    this.circles = [];
    this.isPlay = true;
    this.opacity = 1;

    (window.onresize = () => {
      this.setCanvasSize();
      this.createCircles();
    })();
  }
  setCanvasSize() {
    this.w = this.cnv.width = innerWidth * devicePixelRatio;
    this.h = this.cnv.height = innerHeight * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  createCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; ++i) {
      this.circles.push(
        new Circle(this.w, this.h, this.minRadius, this.maxRadius)
      );
    }
  }
  drawCircles() {
    this.circles.forEach((circle) =>
      circle.draw(this.ctx, this.speed, this.opacity)
    );
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  drawAnimation() {
    if (!this.isPlay) return;
    this.clearCanvas();
    this.drawCircles();
    this.loopId = window.requestAnimationFrame(() => this.drawAnimation());
  }
  stopAnimation() {
    this.isPlay = false;
    window.cancelAnimationFrame(this.loopId || 0);
  }
}

class Circle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  firstColor: string;
  secondColor: string;

  constructor(w: number, h: number, minR: number, maxR: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (maxR - minR) + minR;
    this.firstColor = `hsla(220, 30%, 18%, 1)`;
    this.secondColor = `hsla(220, 30%, 18%, 0)`;
  }
  draw(ctx: CanvasRenderingContext2D, speed: number, opacity: number) {
    this.angle += speed;
    const x = this.x + Math.cos(this.angle) * 200;
    const y = this.y + Math.sin(this.angle) * 200;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);

    gradient.addColorStop(0, `hsla(220, 30%, 80%, 1)`);
    gradient.addColorStop(1, `hsla(220, 30%, 80%, 0)`);

    ctx.globalCompositeOperation = `overlay`;
    ctx.fillStyle = gradient;
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animation = useRef<GradientAnimation | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    animation.current = new GradientAnimation(canvas, context);
    animation.current.drawAnimation();
    return () => {
      if (!animation.current) return;
      animation.current.stopAnimation();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] select-none pointer-events-none">
      <canvas ref={canvasRef} className="w-[100dvw] h-[100dvh]" />
    </div>
  );
}

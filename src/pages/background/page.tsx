import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

class Animation {
  time: number = 0;
  frameId: number = 0;

  w: number;
  h: number;

  circlesNum: number;
  minRadius: number;
  maxRadius: number;
  speed: number;

  circles: Circle[] = [];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.w = window.innerWidth * devicePixelRatio;
    this.h = window.innerHeight * devicePixelRatio;

    this.circlesNum = 30;
    this.minRadius = 400;
    this.maxRadius = 400;
    this.speed = 0.005;

    this.circles = [];
  }

  resize() {
    this.w = this.ctx.canvas.width = window.innerWidth * devicePixelRatio;
    this.h = this.ctx.canvas.height = window.innerHeight * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    this.createCircles();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.fillStyle = `hsla(231, 100%, 8%, 1)`;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  createCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; i++) {
      this.circles.push(new Circle(this.w, this.h, 400, 400));
    }
  }

  drawCircles() {
    this.circles.forEach((circle) => circle.draw(this.ctx, this.speed));
  }

  draw() {
    this.time += 1;
    this.clear();
    this.drawCircles();
  }

  animate() {
    this.draw();
    this.frameId = requestAnimationFrame(() => this.animate());
  }

  run() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.animate();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener("resize", this.resize);
  }
}

class Circle {
  x: number;
  y: number;
  angle: number;
  radius: number;

  constructor(w: number, h: number, minR: number, maxR: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (maxR - minR) + minR;
  }
  draw(ctx: CanvasRenderingContext2D, speed: number) {
    this.angle += speed;
    const x = this.x + Math.cos(this.angle) * 200;
    const y = this.y + Math.sin(this.angle) * 200;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);

    gradient.addColorStop(0, `hsla(228, 100%, 50%, 1)`);
    gradient.addColorStop(1, `hsla(228, 100%, 50%, 0)`);

    ctx.globalCompositeOperation = `overlay`;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animation = new Animation(ctx);
    animation.run();
    return () => {
      animation.stop();
    };
  }, [ref]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}

export function BackgroundPage() {
  return (
    <>
      <Canvas />
      <div className="w-[100dvw] h-[100dvh] flex justify-center items-center z-10">
        <div className="max-w-[300px] w-full text-center flex flex-col gap-4">
          <div className="text-2xl font-semibold text-background">
            2024-1 SSU Devcon
          </div>
          <Button
            variant={"outline"}
            className="w-full flex justify-between"
            asChild
          >
            <Link to="/">
              <span>돌아가기</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

class Animation {
  time: number = 0;
  frameId: number = 0;

  mousePos: { x: number; y: number } = { x: 0, y: 0 };
  constructor(private ctx: CanvasRenderingContext2D) {}

  resize() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  updateMousePos(e: MouseEvent) {
    this.mousePos = { x: e.clientX, y: e.clientY };
  }

  draw() {
    this.time += 1;

    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(this.mousePos.x - 10, this.mousePos.y - 10, 20, 20);
  }

  animate() {
    this.draw();
    this.frameId = requestAnimationFrame(() => this.animate());
  }

  run() {
    this.resize();
    window.addEventListener("mousemove", this.updateMousePos.bind(this));
    window.addEventListener("resize", this.resize.bind(this));
    this.animate();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener("mousemove", this.updateMousePos);
    window.removeEventListener("resize", this.resize);
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

export function ScreenSizePage() {
  return (
    <>
      <Canvas />
      <div className="w-[100dvw] h-[100dvh] flex justify-center items-center z-10">
        <div className="max-w-[300px] w-full text-center flex flex-col gap-4">
          <div className="text-2xl font-semibold">2024-1 SSU Devcon</div>
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

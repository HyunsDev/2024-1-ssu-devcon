import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

class Animation {
  time: number = 0;
  frameId: number = 0;
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw() {
    this.time += 1;

    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.font = "30px Arial";
    this.ctx.fillText(
      this.time.toString(),
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  animate() {
    this.draw();
    this.frameId = requestAnimationFrame(this.animate.bind(this));
  }

  run() {
    this.animate();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
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

  return <canvas ref={ref} width={300} height={300} className="bg-slate-100" />;
}

export function CanvasAnimationPage() {
  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center">
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
        <Canvas />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#001C8A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(canvas.width / 2 - 10, canvas.width / 2 - 10, 20, 20);
  }, [ref]);

  return <canvas ref={ref} width={300} height={300} />;
}

export function CanvasInReactPage() {
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

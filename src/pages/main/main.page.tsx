import { BackgroundCanvas } from "@/components/ui/BackgroundCanvas";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function MainPage() {
  return (
    <>
      <div className="w-[100dvw] h-[100dvh] flex justify-center items-center">
        <div className="max-w-[300px] w-full text-center">
          <div className="text-2xl font-semibold">2024-1 SSU Devcon</div>
          <div className="text-muted-foreground">
            React와 Canvas로 인터렉티브한 배경 만들기
          </div>
          <div className="">
            <a
              href="https://hyuns.dev"
              className="text-muted-foreground text-sm hover:underline"
            >
              숭실대학교 글로벌미디어학부 23학번 박현우
            </a>
          </div>
          <div className="py-8 flex flex-col gap-2">
            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <Link to="/canvas-in-react">
                <span>#1</span>
                <span>Canvas In React</span>
              </Link>
            </Button>

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <Link to="/canvas-animation">
                <span>#2</span>
                <span>Canvas Animation</span>
              </Link>
            </Button>

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <Link to="/cursor">
                <span>#3</span>
                <span>Cursor</span>
              </Link>
            </Button>

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <Link to="/screen-size">
                <span>#4</span>
                <span>Screen Size</span>
              </Link>
            </Button>

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <Link to="/background">
                <span>#5</span>
                <span>Background</span>
              </Link>
            </Button>

            <Separator className="my-4" />

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <a href="/ppt.pdf" target="_blank">
                <span>PDF</span>
                <span>발표자료</span>
              </a>
            </Button>

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <a href="https://hyuns.dev" target="_blank">
                <span>연사</span>
                <span>웹사이트</span>
              </a>
            </Button>

            <Button
              variant={"outline"}
              className="w-full flex justify-between"
              asChild
            >
              <a href="https://hyuns.space" target="_blank">
                <span>연사</span>
                <span>포트폴리오</span>
              </a>
            </Button>
          </div>
          <div className="">
            <a
              href="https://github.com/HyunsDev/2024-1-ssu-devcon"
              className="text-muted-foreground text-xs underline"
            >
              https://github.com/HyunsDev/2024-1-ssu-devcon
            </a>
          </div>
        </div>
      </div>
      <BackgroundCanvas />
    </>
  );
}

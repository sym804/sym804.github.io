/**
 * @registry-meta
 * name: card
 * dependencies: ["@radix-ui/react-slot"]
 * internalDeps: ["utils"]
 *
 * asChild 사용 시 단일 자식 요소를 받아 그 요소가 Card 의 클래스/속성을 흡수합니다.
 * Link 로 감쌀 때 유용합니다 (e.g. <Card asChild><a href="...">...</a></Card>).
 *
 * caveat: ref 타입은 HTMLDivElement 로 고정되어 있으므로 asChild 로 다른 element
 * (a, button 등) 를 넘길 때 ref 를 보유하려면 사용자 측에서 해당 element 의 ref 타입을
 * 직접 선언하고 cast 하세요. 이는 shadcn/ui 와 동일한 약속입니다.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface CardProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  /**
   * 클릭 가능한 카드. hover 에 떠오르고 누르면 내려앉는다 (v0.12.0).
   *
   * 정적 카드에는 쓰지 않는다. 모든 카드가 떠오르면 "누를 수 있다"는 신호가 무의미해진다.
   * 보통 `asChild` 로 Link 를 감쌀 때 함께 쓴다:
   *   <Card interactive asChild><a href="/x">...</a></Card>
   */
  interactive?: boolean;
}

export function Card({ className, asChild = false, interactive = false, ...props }: CardProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "border-border bg-surface text-foreground rounded-md border p-5 shadow-sm",
        interactive && [
          // 위치가 바뀌는 모션(translate)은 motion-safe 로 감싼다.
          // motion-reduce:transform-none 은 무효다 - Tailwind v4 는 transform 이 아니라 개별
          // translate/scale 속성을 쓰고, :active 가 특이성에서 이긴다. reduced-motion 사용자에게
          // 규칙 자체가 적용되지 않도록 motion-safe 로 감싸는 것이 정석이다.
          // 그림자/테두리 색은 위치를 바꾸지 않으므로 reduced-motion 에서도 남긴다(피드백은 유지).
          "cursor-pointer transition-[box-shadow,translate,border-color] duration-150 ease-standard",
          "hover:border-ring/40 hover:shadow-md motion-safe:hover:-translate-y-0.5",
          // 눌렀을 때 제자리로 내려앉는다. 리프트가 사라지는 게 곧 press feedback 이다.
          "active:shadow-sm active:duration-100 motion-safe:active:translate-y-0",
        ],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-3 flex flex-col gap-1", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 className={cn("text-foreground text-base font-bold", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-sm", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-border mt-3 flex items-center justify-end gap-2 border-t pt-3",
        className,
      )}
      {...props}
    />
  );
}

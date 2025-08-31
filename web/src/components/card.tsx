import { type ComponentProps, type JSX, createElement, type ReactNode } from "react";

interface CardProps extends ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

export default function Card({
  as = "div",
  children,
  className,
  ...props
}: CardProps) {
    return createElement(
        as,
        {
            className: `card-element ${className}`,
            ...props
        },
        children
    ) 
}
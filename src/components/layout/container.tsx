import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** 1200px content width (75rem) plus responsive gutters. */
export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-10 ${className}`}
      {...props}
    />
  );
}

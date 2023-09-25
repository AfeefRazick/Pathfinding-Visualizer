import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...args: (string | undefined)[]) {
  return twMerge(clsx(args))
}

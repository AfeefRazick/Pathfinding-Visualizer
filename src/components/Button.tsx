import { ReactNode } from "react"
import { useAppContext } from "../context/appContext"
import { cn } from "../utils/cn"

type ButtonProps = {
  onClick: () => void
  className?: string
  children: ReactNode
  isActive?: boolean
  noShadow?: boolean
  noEdge?: boolean
}

export const Button = ({
  children,
  onClick,
  className,
  isActive,
  noShadow,
  noEdge,
}: ButtonProps) => {
  const { appState } = useAppContext()
  return (
    <button
      role="button"
      disabled={appState.isVisualizing}
      className={cn("button-pushable", className)}
      onClick={onClick}
    >
      {!noShadow && <span className="button-shadow"></span>}
      {!noEdge && (
        <span
          className={cn(
            "button-edge bg-[rgb(0,190,218)] brightness-75",
            isActive ? "bg-black" : "",
            className
          )}
        ></span>
      )}
      <span
        className={cn(
          "button-front text  bg-[rgb(0,190,218)] font-medium text-white",
          isActive ? "bg-black text-white" : "",
          className
        )}
      >
        {children}
      </span>
    </button>
  )
}
// bg-[rgb(11,137,215)]

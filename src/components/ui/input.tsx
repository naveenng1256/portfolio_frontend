import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  justNumber?: boolean;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      maxLength = undefined,
      value,
      onChange,
      justNumber = false,
      isError = false,
      ...props
    },
    ref,
  ) => {
    const [inputState, setInputState] = React.useState(value || "");

    // Synchronize local state with the `value` prop
    React.useEffect(() => {
      setInputState(value || ""); // Update local state when `value` changes
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;

      if (justNumber && type === "number" && !/^\d*$/.test(text)) {
        // Allow only integers
        return;
      }

      if (maxLength === undefined || maxLength >= text.length) {
        setInputState(type === "number" ? Math.floor(parseInt(text)) : text);
        if (onChange) {
          onChange(e);
        }
      }
    };

    return (
      <input
        type={type}
        value={inputState}
        onChange={handleInputChange}
        onWheel={(e) => {
          // Prevent scrolling from affecting the input value
          if (type === "number") {
            e.preventDefault();
            e.currentTarget.blur(); // Remove focus to block changes via scroll
          }
        }}
        onKeyDown={(e) => {
          // Prevent value modification via arrow keys
          if (type === "number" && ["ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        step={type === "number" ? "1" : undefined} // Restrict floats for type="number"
        className={cn(
          "flex h-10 w-full items-center justify-between",
          "placeholder:text-xs placeholder:text-slate-400/60",
          "whitespace-nowrap bg-transparent px-5 py-3 text-xs text-slate-950",
          "rounded-[8px] border-2 bg-white shadow-none",
          "transition-all duration-300 ease-in-out",
          "ring-offset-background focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus:border-blue-400 focus:ring focus:ring-blue-400/25 focus:ring-offset-0 focus:hover:border-blue-400",
          type === "number" ? "numInput" : "", // Hide toggle for type="number"
          isError
            ? "border-red-500 hover:border-red-500"
            : "border-slate-200 hover:border-blue-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

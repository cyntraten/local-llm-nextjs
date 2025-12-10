import { TextareaHTMLAttributes, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

interface SystemPromptTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
}

export const SystemPromptTextarea = ({
  value = "",
  onChange,
  maxRows = 6,
  className,
  ...props
}: SystemPromptTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const lineHeight =
      parseFloat(window.getComputedStyle(textarea).lineHeight) || 20;
    const maxHeight = lineHeight * maxRows;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, maxRows]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none",
        className
      )}
      rows={1}
      {...props}
    />
  );
};

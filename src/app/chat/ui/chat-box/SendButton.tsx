import Link from "next/link";
import { cn } from "@/lib/utils";

interface SendButtonProps {
  isButtonDisabled: boolean;
  isLoggedIn: boolean;
}

export const SendButton = ({
  isButtonDisabled,
  isLoggedIn,
}: SendButtonProps) => {
  const buttonClasses = cn(
    "bg-blue-500 text-white px-4 py-1 rounded cursor-pointer hover:bg-green-500",
    isButtonDisabled && "bg-gray-800 opacity-60 hover:bg-red-500"
  );

  if (!isLoggedIn) {
    return (
      <Link href="/login">
        <button
          className={buttonClasses}
          type="button"
          disabled={isButtonDisabled}
        >
          Send
        </button>
      </Link>
    );
  }

  return (
    <button className={buttonClasses} type="submit" disabled={isButtonDisabled}>
      Send
    </button>
  );
};

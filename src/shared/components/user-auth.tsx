import Link from "next/link";
import { Logo } from "../ui/icons/logo";
import { Session } from "next-auth";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface Props {
  session: Session;
}

export const UserAuth = ({ session }: Props) => {
  const userName = capitalize(session?.user.name || "");
  return (
    <div className="flex justify-between max-w-full items-center p-1 pl-0">
      <div key={"Profile-Settings"} className="p-2 pl-0">
        <div className="flex items-center">
          <Logo
            text={userName.charAt(0)}
            className="text-xl"
            isUserLogo={true}
          />
          <div className="ml-4 text-l">{userName}</div>
        </div>
      </div>
    </div>
  );
};

import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import Menu from "./menu";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <Link className="flex-start" href="/">
          <Image
            src="/images/logo.svg"
            alt={`${APP_NAME} logo`}
            width={48}
            height={48}
            priority
          />
          <span className="hidden sm:block font-bold text-2xl ml-3">
            {APP_NAME}
          </span>
        </Link>
        <Menu />
      </div>
    </header>
  );
};

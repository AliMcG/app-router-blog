import Link from "next/link";
import { useSession } from "next-auth/react";
import Tooltip from "@mui/material/Tooltip";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <Tooltip title="Sign in to Heart a blog">
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="bg-blue/10 text-blue hover:bg-blue/60 w-28 rounded border-2 border-[#CFE1FF] px-3 py-1 font-semibold text-gray-700 no-underline transition"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </Tooltip>
  );
};

export default LoginButton;

import Link from "next/link";
import { useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="bg-blue/10 text-blue hover:bg-blue/60 w-28 rounded border-2 border-[#CFE1FF] px-3 py-1 font-semibold text-gray-700 no-underline transition"
    >
      {session ? "Sign out" : "Sign in"}
    </Link>
  );
};

export default LoginButton;

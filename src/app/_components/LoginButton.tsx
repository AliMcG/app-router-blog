import Link from "next/link"
import { useSession } from 'next-auth/react';

const LoginButton = () => {
    const { data: session } = useSession();
    return (
        <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="bg-blue/10 w-28 text-blue rounded border-2 border-[#CFE1FF] hover:bg-blue/60 px-3 py-1 font-semibold no-underline transition text-gray-700"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
    )
}

export default LoginButton
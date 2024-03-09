import { signIn, signOut, useSession } from "next-auth/react";
import Tooltip from "@mui/material/Tooltip";

const AuthButton = () => {
  const { data: session } = useSession();
  return (
    <Tooltip title="Sign in to Heart a blog">
      <button
      data-cy="auth-button"
      onClick={session ? () => void signOut() : () => void signIn("google")}
        className="bg-custom-blue hover:bg-blue-200 w-28 rounded border-2 border-[#CFE1FF] px-3 py-1 font-semibold text-gray-700 no-underline transition"
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </Tooltip>
  );
};

export default AuthButton;

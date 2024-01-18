import type { ReactNode } from "react"

const MessageContainer = ({ message, children }: { message: string, children?: ReactNode}) => {
    return (
        <div className="flex justify-center p-4">
        <div className="my-10 flex flex-col items-center border-2 border-[#CFE1FF]">
          <h2 className="mb-4 p-10 font-monts text-2xl font-semibold text-[#073D93] hover:text-[#067A75]">
            {message}
          </h2>
        {children}
        </div>
      </div>
    )
}

export default MessageContainer
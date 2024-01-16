export type ButtonProps = {
  text: string;
  textColour: string;
  onClick: () => void;
};

const Button = ({ onClick, text, textColour }: ButtonProps) => {
  return (
    <button
      className={`bg-blue/10 hover:bg-blue/60 w-28 rounded border-2 border-[#CFE1FF] px-3 py-1 font-semibold no-underline transition ${textColour}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

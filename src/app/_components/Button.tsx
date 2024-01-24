import { cva, type VariantProps } from 'class-variance-authority'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;

};
const buttonStyles = cva(
  'bg-blue/10 hover:bg-blue/60 w-28 rounded border-2 border-[#CFE1FF] px-3 py-1 font-semibold no-underline transition',
  {
    variants: {
      intent: {
        primary: 'text-blue-500',
        secondary: 'text-green-500',
        danger: 'text-red-500'
      }
    },
    defaultVariants: {
      intent: 'primary'
    }
  }
)
export interface CombinedButtonProps extends ButtonProps, VariantProps<typeof buttonStyles> {}

const Button = ({ text, intent, ...rest }: CombinedButtonProps) => {
  return (
    <button
      className={buttonStyles({intent})}
     {...rest}
    >
      {text}
    </button>
  );
};

export default Button;

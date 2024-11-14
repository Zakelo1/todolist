import { cva } from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover", "text-secondary-text"],
      ghost: ["hover:bg-gray-100", "text-gray-500"],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: ["rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center", "p-2.5"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ variant, size, children, className, ...props }) => {
  return (
    <button className={twMerge(buttonStyles({ variant, size, className }), className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

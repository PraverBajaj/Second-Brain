import { ReactNode } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  starticon?: ReactNode; 
  endicon?: ReactNode;
  disabled?:boolean,
  onClick?: () => void;
}

const sizestyle = {
  sm: "p-2 px-4 text-sm",
  md: "p-2 px-4 text-sm font-medium",
  lg: "p-4 px-8 text-lg",
};

const defaultstyle =
  "flex items-center justify-center rounded-lg hover:cursor-pointer transition-all duration-100 ease-in-out font-light";

const varientstyle = {
  primary: "bg-[#4f39f6] text-white hover:bg-[#645CD4]",
  secondary: "bg-[#e1e7ff] text-[#827dd8] hover:outline-dashed hover:bg-white",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${varientstyle[props.varient]} ${defaultstyle} ${sizestyle[props.size]}`}
      aria-label={props.text}
    >
      {props.starticon && <div className="mr-2">{props.starticon}</div>}
      <span>{props.text}</span>
      {props.endicon && <div className="ml-2">{props.endicon}</div>}
    </button>
  );
};

export default Button;

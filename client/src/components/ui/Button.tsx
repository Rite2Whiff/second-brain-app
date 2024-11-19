interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  // startIcon?: ReactElement;
  // endIcon?: ReactElement;
  onClick: () => void;
}

const variantTypes = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-400 text-purple-600",
};

const sizeTypes = {
  sm: "px-4 py-2",
  md: "px-6 py-2",
  lg: "px-8 py-2",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={
        variantTypes[props.variant] +
        " " +
        sizeTypes[props.size] +
        " " +
        "rounded-lg"
      }
    >
      {props.text}
    </button>
  );
};

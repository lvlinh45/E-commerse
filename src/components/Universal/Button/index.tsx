const Button = ({
  className,
  text,
  onClick,
}: {
  className?: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <span className={`${className} button-universal`} onClick={onClick}>
      {text}
    </span>
  );
};

export default Button;

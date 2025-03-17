const Button = ({ className, text }: { className?: string; text: string }) => {
  return <span className={`${className} button-universal`}>{text}</span>;
};

export default Button;

const Text = ({
  text,
  classname = "",
}: {
  text: string;
  classname?: string;
}) => {
  return <div className={`${classname} heading`}>{text}</div>;
};

export default Text;

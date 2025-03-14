const Text = ({
  text,
  classname = "",
  showAll,
}: {
  text: string;
  classname?: string;
  showAll?: string;
}) => {
  return (
    <div
      className={`text-container  ${
        showAll ? "justify-content-between" : "justify-content-center"
      }`}
    >
      <div className={`${classname} heading`}>{text}</div>
      <p className={`${classname} text-showAll`}>{showAll}</p>
    </div>
  );
};

export default Text;

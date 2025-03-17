const Text = ({
  text,
  classname = "",
  showAll,
  textCenter = "",
}: {
  text: string;
  classname?: string;
  showAll?: string;
  textCenter?: string;
}) => {
  return (
    <div
      className={`text-container ${textCenter} ${
        showAll ? "justify-content-between" : ""
      }`}
    >
      <div className={`${classname} heading`}>{text}</div>
      <p className={`${classname} text-showAll`}>{showAll}</p>
    </div>
  );
};

export default Text;

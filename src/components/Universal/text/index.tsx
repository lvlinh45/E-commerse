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
    <div className="text-container" style={{ paddingRight: "7px" }}>
      <div className={`${classname} heading`}>{text}</div>
      <p className={`${classname} text-showAll`}>{showAll}</p>
    </div>
  );
};

export default Text;

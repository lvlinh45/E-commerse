import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div
      className={`text-container ${textCenter} ${
        showAll ? "justify-content-between" : ""
      }`}
    >
      <div className={`${classname} heading`}>{text}</div>
      <p
        className={`${classname} text-showAll`}
        onClick={() => navigate("/collection/all")}
      >
        {showAll}
      </p>
    </div>
  );
};

export default Text;

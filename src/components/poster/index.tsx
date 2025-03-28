import { useNavigate } from "react-router-dom";

const Poster = ({ posterUrl }: { posterUrl: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-100 mt-5 poster"
      onClick={() => navigate("/collection/all")}
    >
      <div className="poster-wrapper">
        <img className="w-100" src={posterUrl} alt="Poster" />
      </div>
      <div className="poster-overlay"></div>
    </div>
  );
};

export default Poster;

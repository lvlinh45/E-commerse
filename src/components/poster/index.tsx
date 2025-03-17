import { posterUrl } from "../../constants/urlPoster";

const Poster = () => {
  return (
    <div className="w-100 mt-5">
      <img className="w-100" src={posterUrl[0].url} alt="Poster 1" />
    </div>
  );
};

export default Poster;

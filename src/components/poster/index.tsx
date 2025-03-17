const Poster = ({ posterUrl }: { posterUrl: string }) => {
  return (
    <div className="w-100 mt-5" style={{ cursor: "pointer" }}>
      <img className="w-100" src={posterUrl} alt="Poster 1" />
    </div>
  );
};

export default Poster;

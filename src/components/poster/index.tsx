const Poster = ({ posterUrl }: { posterUrl: string }) => {
  return (
    <div className="w-100 mt-5 poster">
      <div className="poster-wrapper">
        <img className="w-100" src={posterUrl} alt="Poster" />
      </div>
      <div className="poster-overlay"></div>
    </div>
  );
};

export default Poster;

const ProductItem = ({ url }: { url?: string }) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <img
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        src={url}
        alt=""
      />
    </div>
  );
};

export default ProductItem;

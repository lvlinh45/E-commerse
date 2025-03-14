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
          paddingRight: "7px",
          objectFit: "cover",
        }}
        src={url}
        alt=""
      />
    </div>
  );
};

export default ProductItem;

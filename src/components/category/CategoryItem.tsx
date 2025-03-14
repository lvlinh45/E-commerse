const CategoryItem = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="category-item">
      <p>
        <img src={url} alt="category-item" />
      </p>
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;

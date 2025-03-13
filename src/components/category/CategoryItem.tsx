const CategoryItem = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="category-item">
      <div>
        <img src={url} alt="category-item" />
      </div>
      <div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;

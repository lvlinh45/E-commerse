import React from "react";

interface ImageInputProps {
  index: number;
  image: string | null;
  onImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  index,
  image,
  onImageChange,
}) => {
  return (
    <div style={{ textAlign: "center", width: "120px", height: "120px" }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageChange(e, index)}
      />
      {image ? (
        <img
          src={image}
          alt={`Uploaded ${index}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#f7f7f7",
            color: "#ccc",
          }}
        >
          <span>+ Add a photo</span>
        </div>
      )}
    </div>
  );
};

export default ImageInput;

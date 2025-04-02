import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./_imageUploaded.scss";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageUploader: React.FC<{ setValue: any; errors: any }> = ({
  setValue,
  errors,
}) => {
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  const onDrop = (acceptedFiles: File[], index: number) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      const updatedImages = [...images];
      updatedImages[index] = imageUrl;
      setImages(updatedImages);
      setValue(`imageUrl[${index}]`, imageUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
    setValue(`imageUrl[${index}]`, null);
  };

  const ImageDropzone = (index: number) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, index),
      accept: { "image/*": [] },
      multiple: false,
    });

    return (
      <div {...getRootProps()} className="image-dropzone">
        <input {...getInputProps()} />
        {images[index] ? (
          <>
            <img src={images[index]} alt={`Uploaded Image ${index + 1}`} />
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
              className="delete-icon"
            >
              X
            </span>
          </>
        ) : (
          <p>Upload Image {index + 1}</p>
        )}
      </div>
    );
  };

  return (
    <div className="admin-product-form-item">
      <label htmlFor="product-image" style={{ fontWeight: "bold" }}>
        Product Images
      </label>
      <div className="image-dropzone-container">
        <div className="image-dropzone-left">{ImageDropzone(0)}</div>
        <div className="image-dropzone-right">
          {ImageDropzone(1)}
          {ImageDropzone(2)}
        </div>
      </div>
      {errors.imageUrl && (
        <p className="error-message"> {errors.imageUrl.message}</p>
      )}
    </div>
  );
};

export default ImageUploader;

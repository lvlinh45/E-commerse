import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  // Hàm xử lý khi người dùng chọn ảnh
  const onDrop = (acceptedFiles: File[], index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = acceptedFiles[0]; // Lưu ảnh vào vị trí tương ứng
    setImages(updatedImages); // Cập nhật danh sách ảnh
  };

  // Hàm xóa ảnh
  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null; // Đặt lại vùng này thành null (vùng upload ban đầu)
    setImages(updatedImages); // Cập nhật lại danh sách ảnh
  };

  // Hàm lưu ảnh vào localStorage
  const handleSave = () => {
    // Chuyển ảnh thành Base64 và lưu vào localStorage
    const base64Images = images.map((image) =>
      image ? URL.createObjectURL(image) : null
    );
    localStorage.setItem("uploadedImages", JSON.stringify(base64Images));
    alert("Ảnh đã được lưu vào localStorage!");
  };

  // Đọc ảnh từ localStorage khi component được mount
  useEffect(() => {
    const savedImages = localStorage.getItem("uploadedImages");
    if (savedImages) {
      const parsedImages = JSON.parse(savedImages);
      const updatedImages = parsedImages.map((image: string) =>
        image ? new File([image], "image", { type: "image/jpeg" }) : null
      );
      setImages(updatedImages);
    }
  }, []);

  return (
    <div>
      <h1>Tải lên tối đa 3 ảnh</h1>

      {/* Hiển thị 3 vùng upload ảnh */}
      <div style={{ display: "flex", gap: "20px" }}>
        {images.map((file, index) => (
          <div
            key={index}
            style={{ position: "relative", width: "120px", height: "120px" }}
          >
            {/* Nếu có ảnh, hiển thị ảnh đó, nếu không có ảnh thì hiển thị vùng drop */}
            {file ? (
              <img
                src={URL.createObjectURL(file)} // Tạo URL tạm thời cho ảnh
                alt={`Uploaded ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  border: "2px dashed #007bff",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <DropzoneArea onDrop={onDrop} index={index} />
              </div>
            )}

            {/* Nút xóa ảnh */}
            {file && (
              <div
                onClick={() => handleDeleteImage(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#ff0000",
                  border: "1px solid #ff0000",
                }}
              >
                X
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nút save */}
      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
};

// Component DropzoneArea cho từng vùng upload
const DropzoneArea: React.FC<{
  onDrop: (acceptedFiles: File[], index: number) => void;
  index: number;
}> = ({ onDrop, index }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => onDrop(acceptedFiles, index),
    accept: { "image/*": [] },
    multiple: false, // Chỉ cho phép chọn một ảnh
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} style={{ display: "none" }} />
      <p>Drop your images or selected click to browse</p>
    </div>
  );
};

export default ImageUploader;

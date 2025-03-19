import React, { useRef, useEffect, useState } from "react";

// Định nghĩa kiểu Props
interface HoverZoomImageProps {
  imageSrc: string; // Đường dẫn ảnh
  altText?: string; // Văn bản thay thế (không bắt buộc)
  width?: string; // Chiều rộng của wrapper
  height?: string; // Chiều cao của wrapper
  zoomScale?: number; // Mức độ phóng to (mặc định 2x)
  className?: string; // Class tùy chỉnh cho wrapper
}

const HoverZoomImage: React.FC<HoverZoomImageProps> = ({
  imageSrc,
  altText = "Zoomable Image",
  width = "900px",
  height = "600px",
  zoomScale = 2,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover

  useEffect(() => {
    const image = imageRef.current;
    const imageWrapper = wrapperRef.current;

    if (!image || !imageWrapper) return;

    const handleHoverImage = (e: MouseEvent) => {
      setIsHovered(true); // Đặt trạng thái hover thành true

      const rect = imageWrapper.getBoundingClientRect();
      const offsetX = ((e.clientX - rect.left) / rect.width) * 100; // Tính tỉ lệ phần trăm vị trí X
      const offsetY = ((e.clientY - rect.top) / rect.height) * 100; // Tính tỉ lệ phần trăm vị trí Y

      // Cập nhật transform origin
      image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    };

    const handleLeaveImage = () => {
      setIsHovered(false); // Đặt trạng thái hover thành false
    };

    imageWrapper.addEventListener("mousemove", handleHoverImage);
    imageWrapper.addEventListener("mouseleave", handleLeaveImage);

    return () => {
      imageWrapper.removeEventListener("mousemove", handleHoverImage);
      imageWrapper.removeEventListener("mouseleave", handleLeaveImage);
    };
  }, []);

  return (
    <div
      className={`image-wrapper `} // Thêm class từ props
      ref={wrapperRef}
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={imageSrc}
        alt={altText}
        className={``}
        ref={imageRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          transform: isHovered ? `scale(${zoomScale})` : "scale(1)",
          transition: "transform 0.2s ease-out",
        }}
      />
    </div>
  );
};

export default HoverZoomImage;

import React from "react";
import { useForm } from "react-hook-form";
import "./adminProduct.scss";
import Swal from "sweetalert2";
interface IFormInput {
  productName: string;
  brand: string;
  description: string;
  salePrice: string;
  discount: string;
  size: string;
  tags: string;
  imageUrl: string;
  visibility: string;
  publishCategory: string;
}

const AdminProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      productName: "",
      brand: "",
      description: "",
      salePrice: "",
      discount: "",
      size: "",
      tags: "",
      imageUrl: "",
      visibility: "",
      publishCategory: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: IFormInput) => {
    const newProduct = {
      id: new Date().getTime(),
      name: data.productName,
      brand: data.brand,
      description: data.description,
      price: parseFloat(data.salePrice),
      discount: parseFloat(data.discount),
      size: data.size,
      tags: data.tags,
      imageUrl: data.imageUrl,
      visibility: data.visibility,
      publishCategory: data.publishCategory,
      numberOfReviews: 0,
      rating: 0,
      status: "new",
    };

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    storedProducts.unshift(newProduct);

    localStorage.setItem("products", JSON.stringify(storedProducts));

    Swal.fire({
      title: "Success!",
      text: "Product has been created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      reset();
      window.location.reload();
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel and reset the form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset",
      cancelButtonText: "No, stay",
    }).then((result) => {
      if (result.isConfirmed) {
        reset();
      }
    });
  };

  return (
    <>
      <header>
        <h2>Create a New Product</h2>
        <button>
          <span>+</span>
          <span>New Product</span>
        </button>
      </header>
      <section className="adminProduct-container">
        <div className="adminProduct-left">
          <h3>General Information</h3>
          <form className="adminProduct-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="adminProduct-form-item">
              <label htmlFor="product-name">Product Name</label>
              <input
                {...register("productName", {
                  required: "Product name is required",
                })}
                type="text"
                id="product-name"
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.productName.message}
                </p>
              )}
            </div>
            <div className="adminProduct-form-item">
              <label htmlFor="brand">Brand</label>
              <select
                {...register("brand", { required: "Brand is required" })}
                id="brand"
              >
                <option value="">Select Brand</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="LV">LV</option>
              </select>
              {errors.brand && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.brand.message}
                </p>
              )}
            </div>
            <div className="adminProduct-form-item adminProduct-form-textArea">
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                placeholder="Enter product description"
              ></textarea>
              {errors.description && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="adminProduct-form-item">
              <label htmlFor="sale-price">Sale Price</label>
              <input
                {...register("salePrice", {
                  required: "Sale price is required",
                })}
                type="text"
                id="sale-price"
                placeholder="Enter sale price"
              />
              {errors.salePrice && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.salePrice.message}
                </p>
              )}
            </div>
            <div className="adminProduct-form-item">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                id="discount"
                placeholder="Enter discount percentage"
              />
            </div>

            <div className="adminProduct-form-item">
              <label htmlFor="size">Select your size</label>
              <div className="adminProduct-size" id="size">
                <input
                  type="radio"
                  id="size-s"
                  value="S"
                  {...register("size", { required: "Size is required" })}
                />
                <label htmlFor="size-s">S</label>

                <input
                  type="radio"
                  id="size-m"
                  value="M"
                  {...register("size", { required: "Size is required" })}
                />
                <label htmlFor="size-m">M</label>

                <input
                  type="radio"
                  id="size-l"
                  value="L"
                  {...register("size", { required: "Size is required" })}
                />
                <label htmlFor="size-l">L</label>
              </div>
              {errors.size && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.size.message}
                </p>
              )}
            </div>

            <div className="adminProduct-action">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <div>
                <button type="submit">Save as Draft</button>
                <button type="submit">Publish</button>
              </div>
            </div>
          </form>
        </div>
        <div className="adminProduct-right">
          <div className="adminProduct-top">
            <div className="adminProduct-form-item">
              <label htmlFor="tags">Tags</label>
              <input
                {...register("tags")}
                {...register("tags", {
                  required: "Tags is required",
                })}
                type="text"
                id="tags"
                placeholder="Enter tags (comma separated)"
              />
              {errors.tags && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.tags.message}
                </p>
              )}
            </div>
            <div className="adminProduct-form-item">
              <label htmlFor="product-image">Product Image</label>
              <input
                {...register("imageUrl", {
                  required: "Product Image is required",
                })}
                type="text"
                id="product-image"
                placeholder="Enter image URL"
              />
              {errors.imageUrl && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="adminProduct-bottom">
            <div className="adminProduct-form-item">
              <label>Visibility</label>
              <div>
                <input
                  {...register("visibility", {
                    required: "Visibility is required",
                  })}
                  type="radio"
                  id="published"
                  value="published"
                />
                <label htmlFor="published">Published</label>

                <input
                  {...register("visibility", {
                    required: "Visibility is required",
                  })}
                  type="radio"
                  id="schedule"
                  value="schedule"
                />
                <label htmlFor="schedule">Schedule</label>

                <input
                  {...register("visibility", {
                    required: "Visibility is required",
                  })}
                  type="radio"
                  id="hidden"
                  value="hidden"
                />
                <label htmlFor="hidden">Hidden</label>
              </div>
              {errors.visibility && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.visibility.message}
                </p>
              )}
            </div>

            <div className="adminProduct-form-item">
              <label htmlFor="publish-category">Publish Category</label>
              <select
                {...register("publishCategory", {
                  required: "Publish Category is required",
                })}
                id="publish-category"
              >
                <option value="">Select Category</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Hat">Hat</option>
                <option value="Towel">Towel</option>
              </select>
              {errors.publishCategory && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.publishCategory.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProduct;

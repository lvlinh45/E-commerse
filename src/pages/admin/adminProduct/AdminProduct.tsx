import React from "react";
import { useForm } from "react-hook-form";
import "./adminProduct.scss";
import Swal from "sweetalert2";
import { IFormInput } from "../../../assets/types/Products";
import ImageUploader from "../../uploadedImage/ImageUploader";

const AdminProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      productName: "",
      brand: "",
      description: "",
      salePrice: "",
      size: "",
      tags: "",
      imageUrl: [],
      visibility: "",
      publishCategory: "",
    },
  });

  const storedProduct = JSON.parse(localStorage.getItem("products") ?? "[]");
  const onSubmit = (data: IFormInput) => {
    if (!data.imageUrl) {
      Swal.fire({
        title: "Error!",
        text: "Product image is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    const newProduct = {
      id: storedProduct.length + 1,
      category: data.publishCategory,
      quantity: 1,
      size: data.size,
      name: data.productName,
      imageUrl: data.imageUrl,
      description: data.description,
      numberOfReviews: 0,
      price: parseFloat(data.salePrice),
      discount: data.discount,
      rating: 0,
      status: "new",
      gender: "MEN",
      brand: data.brand,
    };
    const storedProducts = JSON.parse(localStorage.getItem("products") || "");
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
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Sale price must be greater than 0",
                  },
                })}
                type="number"
                id="sale-price"
                placeholder="Enter sale price"
              />
              {errors.salePrice && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.salePrice.message}
                </p>
              )}
            </div>

            <div
              className="adminProduct-form-item "
              style={{ position: "relative" }}
            >
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                id="discount"
                placeholder="Enter discount percentage"
                {...register("discount", {
                  required: "Discount is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Discount must be greater than 0",
                  },
                  max: {
                    value: 100,
                    message: "Discount must be lesser than 100",
                  },
                })}
              />
              {/* <div className="adminProduct-form-item--discount">%</div> */}
              {errors.discount && (
                <p style={{ marginBottom: 0, marginTop: "3px", color: "red" }}>
                  {errors.discount.message}
                </p>
              )}
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
            <ImageUploader setValue={setValue} errors={errors} />
          </div>

          <div className="adminProduct-bottom">
            <div className="adminProduct-form-item">
              <label>Visibility</label>
              <div>
                <input
                  {...register("visibility", {
                    required: "Visibility is required",
                  })}
                  checked
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

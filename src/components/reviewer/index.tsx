import { useState, useEffect } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Button, Modal, Box, TextField, Rating } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconNotRatingStar,
  IconStar,
  UserIcon,
} from "../../assets/icons/Icons";
import "./reivewer.scss";
import Text from "../Universal/text";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("reviews.Name_is_required"),
  text: Yup.string().required("reviews.Review_is_required"),
  rating: Yup.number()
    .min(1, "reviews.Rating_is_required")
    .required("reviews.Rating_is_required"),
});

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  likes: number;
  dislikes: number;
}

const Reviewers = ({ reviews }: { reviews: Review[] }) => {
  const { t } = useTranslation("detailPage");
  const [openModal, setOpenModal] = useState(false);
  const [reviewsFromLocalStorage, setReviewsFromLocalStorage] =
    useState(reviews);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviewsFromLocalStorage(JSON.parse(storedReviews));
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitReview: SubmitHandler<FieldValues> = (data) => {
    const userExists = reviewsFromLocalStorage.some(
      (review) => review.name === data.name
    );

    if (userExists) {
      setSubmitError(t("reviews.oneReview"));
      return;
    }
    const newId = reviewsFromLocalStorage?.length ?? 0 + 1;
    const newDate = new Date().toLocaleDateString();
    const reviewToSubmit: Review = {
      id: newId,
      name: data.name,
      text: data.text,
      rating: data.rating,
      date: newDate,
      likes: 0,
      dislikes: 0,
    };
    const updatedReviews = [...reviewsFromLocalStorage, reviewToSubmit];
    setReviewsFromLocalStorage(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    setSubmitError(null);
    reset();
    handleCloseModal();
  };

  const averageRating = Number(
    (
      reviewsFromLocalStorage?.reduce(
        (acc, review) => acc + review?.rating,
        0
      ) / reviewsFromLocalStorage?.length
    ).toFixed(2)
  );
  const totalReviews = reviewsFromLocalStorage?.length;

  return (
    <div className="review-container overflow-hidden">
      <Text
        text={"Customer Review"}
        textCenter={"justify-content-center mt-2 mb-2"}
        classname="mb-3"
      ></Text>
      <div className="review-wrapper">
        <div className="review-summary">
          <div className="review-summary__rating">
            <div className="review-summary__rating__number">
              <div className="review-summary__star">
                {Array.from({ length: 5 }, (_, index) =>
                  index < averageRating ? (
                    <IconStar key={index} />
                  ) : (
                    <IconNotRatingStar key={index} />
                  )
                )}
              </div>
              <span>{averageRating} / 5</span>
            </div>
            <p>{totalReviews} đánh giá</p>
          </div>
          <div className="review-wrapper__button">
            <button onClick={handleOpenModal}>
              {t("reviews.CustomerReview")}
            </button>
          </div>
        </div>

        <div className="review-detail">
          {reviewsFromLocalStorage.map((review) => (
            <div className="review-detail-item" key={review.id}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center mb-1">
                  <div
                    className={`${
                      review?.rating > 0 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div>
                      {Array.from({ length: 5 }, (_, index) =>
                        index < review?.rating ? (
                          <IconStar key={index} />
                        ) : (
                          <IconNotRatingStar key={index} />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "12px" }}>{review.date}</div>
              </div>
              <div className="review-user">
                <div>
                  <UserIcon />
                </div>
                <h4>{review.name}</h4>
              </div>
              <div className="review-text">
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <h2> {t("reviews.AddAReview")}</h2>
          <form onSubmit={handleSubmit(handleSubmitReview)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("reviews.YourName")}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                />
              )}
            />
            {errors.name && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {t(errors.name?.message || "")}
              </p>
            )}
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("reviews.YourReview")}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.text}
                  multiline
                  rows={4}
                />
              )}
            />
            {errors.text && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {t(errors.text?.message || "")}
              </p>
            )}
            <div>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value || 0}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
            </div>
            {errors.rating && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {t(errors.rating?.message || "")}
              </p>
            )}
            {submitError && (
              <p style={{ color: "red", fontSize: "14px" }}>{submitError}</p>
            )}
            <div className="d-flex justify-content-end">
              <Button variant="contained" type="submit">
                {t("reviews.SubmitReview")}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Reviewers;

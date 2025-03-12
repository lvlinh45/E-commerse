import { ProductReviews } from "../types/Rating";

export const Rating: ProductReviews[] = [
  {
    productId: 1,
    reviews: [
      {
        userId: 1,
        rating: 4.5,
        review: "Great product, very comfortable for running!",
        date: "2025-03-01",
      },
      {
        userId: 2,
        rating: 5,
        review: "Amazing fit and cushioning. Worth the price!",
        date: "2025-03-02",
      },
      {
        userId: 3,
        rating: 3.8,
        review: "Good quality but a bit tight around the toe area.",
        date: "2025-03-03",
      },
    ],
  },
  {
    productId: 2,
    reviews: [
      {
        userId: 1,
        rating: 4.2,
        review: "Comfortable and stylish, but a little heavier than expected.",
        date: "2025-03-04",
      },
      {
        userId: 4,
        rating: 5,
        review: "Perfect shoes for running long distances. Highly recommend!",
        date: "2025-03-05",
      },
    ],
  },
  {
    productId: 3,
    reviews: [
      {
        userId: 2,
        rating: 4.7,
        review: "The design is sleek and the comfort is superb!",
        date: "2025-03-06",
      },
      {
        userId: 3,
        rating: 3.5,
        review: "The shoes are good but the sole wears out too quickly.",
        date: "2025-03-07",
      },
    ],
  },
  {
    productId: 4,
    reviews: [
      {
        userId: 4,
        rating: 4.8,
        review: "I love the color and fit, excellent for everyday use.",
        date: "2025-03-08",
      },
    ],
  },
  {
    productId: 5,
    reviews: [
      {
        userId: 1,
        rating: 4.3,
        review:
          "Good shoes for training, but I wish the arch support was better.",
        date: "2025-03-09",
      },
      {
        userId: 2,
        rating: 4.6,
        review: "Very comfortable, and they look great with jeans.",
        date: "2025-03-10",
      },
    ],
  },
  {
    productId: 6,
    reviews: [
      {
        userId: 1,
        rating: 4.1,
        review: "Nice, but I expected more padding in the insole.",
        date: "2025-03-11",
      },
      {
        userId: 3,
        rating: 4.9,
        review: "Great for running! Comfortable and durable.",
        date: "2025-03-12",
      },
    ],
  },
];

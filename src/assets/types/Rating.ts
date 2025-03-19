interface Review {
  userId: number;
  rating: number;
  review: string;
  date: string;
}

export interface ProductReviews {
  productId: number;
  reviews: Review[];
}

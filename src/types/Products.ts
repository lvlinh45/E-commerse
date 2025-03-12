export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  tags: string[];
  discount: number;
  numberOfReviews: number;
  rating: number;
}

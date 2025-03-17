export interface Product {
  id?: number;
  name?: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?: number;
  tags?: string[];
  discount?: number;
  numberOfReviews?: number;
  rating?: number;
  status?: string;
  vendor?: string;
}
export interface ProductListProps {
  products: Product[];
  textHeading?: string;
  showAll?: string;
  quatitySlide?: number;
}

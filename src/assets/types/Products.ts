export interface Product {
  id?: number;
  name: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?: number;
  tags?: string[];
  gender?: string;
  brand?: string;
  discount?: number;
  numberOfReviews?: number;
  rating?: number;
  status?: string;
  vendor?: string;
  quantity?: number;
  size?: string | number;
}
export interface ProductListProps {
  products: Product[];
  textHeading?: string;
  showAll?: string;
  quatitySlide?: number;
}
export interface IFormInput {
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

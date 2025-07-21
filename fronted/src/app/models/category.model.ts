export interface Category {
  id: number;
  name: string;
}


export interface CartItem {
  id: number;
  productId: number;
  product: {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    isDeleted: boolean;
    categoryId: number;
    category: string | null;
  };
  quantity: number;
  userId: string;
}

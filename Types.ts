export type RootStackParamList = {
  Home: undefined;
  Products: { categoryId?: number };
  ProductDetail: { productId: number };
  Cart: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Account: undefined;
  Category: undefined;
};

export type Product = {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: number;
  details: string;
  imageUrl: string;
  imageUrls: string[];
};

export type Category = {
  categoryId: number;
  categoryName: string;
  description: string;
  products: Product[];
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

export interface ProductCardProps {
  item: Product;
  cart: CartItem[];
  dispatch: any;
  navigation: any;
}

export type Address = {
  id: number;
  title: string;
  details: string;
};

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
};

export type User = {
  id: number;
  username: string;
  email: string;
};

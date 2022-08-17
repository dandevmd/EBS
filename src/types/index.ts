export interface Category {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  quantity: number;
}
export interface AppContextInterface {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (product: Product) => void;
  addQuantity: (product: Product) => void;
  removeQuantity: (product: Product) => void;
  products: Product[];
  product: Product;
  price: number;
  categories: Category[];
  category: Category;
  isLoading: boolean;
  selectedPriceFilter:string;
  setSelectedPriceFilter: (value:string) => void;
  selectedCategoryFilter:string;
  setSelectedCategoryFilter: (value:string) => void;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => void;
  fetchCategories: () => void;
  fetchProductsByCategory: (category: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  filterProductsByPrice: (price: string) => void;
  setIsActive: (isActive: boolean) => void;

}

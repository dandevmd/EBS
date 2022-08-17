import { createContext, useState, useEffect, Children } from "react";
import axios from "axios";
import { Product, Category, AppContextInterface } from "../types";

const API_URL = "http://localhost:3001/";

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<Partial<AppContextInterface>>({});

export const AppProvider = ({ children }: AppContextProviderProps) => {
  // fetch products from the server
  const [products, setProducts] = useState([] as Product[]);
  const [categories, setCategories] = useState([] as Category[]);
  const [cart, setCart] = useState([] as Product[]);
  const [price, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPriceFilter, setSelectedPriceFilter] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  //fetch all products from the server
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(API_URL + "products");
      if (result?.data) {
        setProducts(result.data);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    setIsLoading(false);
  };

  //fetch all categories from the server
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(API_URL + "categories");
      if (result?.data) {
        setCategories(result.data);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    setIsLoading(false);
  };

  //fetch products by category from the server
  const fetchProductsByCategory = async (category: any) => {
    setIsLoading(true);
    try {
      const result = await axios.get(API_URL + "products");
      if (result?.data) {
        category.toLowerCase() == "all"
          ? setProducts(result.data)
          : setProducts(
              result.data.filter(
                (item: Product) => item.category === category.toLowerCase()
              )
            );
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    setIsLoading(false);
  };
  // fetch cart from the server
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(API_URL + "cart");
      if (result?.data) {
        setCart(result.data);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    setIsLoading(false);
  };

  // add item to the cart
  const addProductToCart = async (product: Product) => {
    const itemExists = cart.find((item: Product) => item.id === product.id);
    if (itemExists) {
      return;
    }
    const newProduct = { ...product, quantity: 1 };
    setCart([...cart, newProduct]);

    try {
      if (!itemExists) {
        await axios.post(API_URL + "cart", newProduct);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  //remove item from the cart
  const removeProductFromCart = async (product: Product) => {
    const filteredItem = cart.filter((item: Product) => item.id !== product.id);
    setCart(filteredItem);
    try {
      await axios.delete(API_URL + "cart/" + product.id);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  // add quantity to product from cart
  const addQuantity = (product: Product) => {
    const newCart = cart
      .map((item: Product) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
      .filter((item: Product) => item.quantity > 0);
    setCart(newCart);
    setProducts(
      products.map((item: Product) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
    try {
      axios.put(API_URL + "cart/" + product.id, {
        ...product,
        quantity: product.quantity + 1,
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  // remove quantity to product from cart
  const removeQuantity = async (product: Product) => {
    if (product.quantity === 1) {
      removeProductFromCart(product);
      return;
    }

    const newCart = cart
      .map((item: Product) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item: Product) => item.quantity > 0);
    setCart(newCart);
    setProducts(
      products.map((item: Product) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
    try {
      axios.put(API_URL + "cart/" + product.id, {
        quantity: product.quantity - 1,
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  // filter products by price
  const filterProductsByPrice = (price: string) => {
    let renderedItems: Product[] = products;
    if (
      selectedCategoryFilter !== "all" &&
      selectedCategoryFilter !== "All" &&
      selectedCategoryFilter !== "" &&
      !selectedCategoryFilter
    ) {
      const filteredProducts = products.filter(
        (item: Product) => item.category.name === selectedCategoryFilter
      );
      renderedItems = filteredProducts;
    }
    if (price === "Increasing") {
      setProducts(
        renderedItems.sort((a: Product, b: Product) => a.price - b.price)
      );
    }
    if (price === "Decreasing") {
      setProducts(
        renderedItems.sort((a: Product, b: Product) => b.price - a.price)
      );
    }
  };

  // calculate the total price of the cart
  const calculateTotalPrice = () => {
    const x = cart.reduce((total: number, item: Product) => {
      return total + item.price * item.quantity;
    }, 0);

    return Number(x.toFixed(2));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, []);

  //fetch items by selected category from the server
  useEffect(() => {
    if (selectedCategoryFilter !== "all" && selectedCategoryFilter !== "") {
      fetchProductsByCategory &&
        fetchProductsByCategory(selectedCategoryFilter!);
    }
    if (selectedCategoryFilter == "all") {
      fetchProducts && fetchProducts();
      fetchCategories && fetchCategories();
    }
  }, [selectedCategoryFilter]);

  //run total price function
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart]);


  const value = {
    products,
    categories,
    fetchProducts,
    fetchCategories,
    setProducts,
    isLoading,
    selectedPriceFilter,
    setSelectedPriceFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    fetchProductsByCategory,
    filterProductsByPrice,
    addProductToCart,
    removeProductFromCart,
    cart,
    addQuantity,
    removeQuantity,
    price,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

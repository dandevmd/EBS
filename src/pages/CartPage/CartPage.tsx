import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import CartComponent from "../../components/cartComponent/CartComponent";
import styles from "./cart.module.css";

const CartPage = () => {
  const { cart, price } = useContext(AppContext);

 if(cart && cart.length === 0) {
    return <div className={styles.empty_cart}>
    <h1 >Cart is empty</h1>
    <Link to="/">
      Click to go back to the home page
      </Link>
    </div>
 }
  return (
    <>
      <h1 className={styles.app_title}>CART</h1>
      <Link to="/" className={styles.home_link}>Home</Link>
      <div className={styles.wrapper}>
        <div className={styles.product_container}>
          <ul className={styles.columns_title}>
            <li className={styles.li_item}>Category</li>
            <li className={styles.li_item}>Name</li>
            <li className={styles.li_item}>Price</li>
            <li className={styles.li_item}>Quantity</li>
            <li className={styles.li_item}>Actions</li>
          </ul>
          {cart &&
            cart.map((product: Product) => (
              <CartComponent key={product.id} product={product}></CartComponent>
            ))}
        </div>
      </div>
      <h3 className={styles.price}>Total price: {price} $</h3>
    </>
  );
};

export default CartPage;

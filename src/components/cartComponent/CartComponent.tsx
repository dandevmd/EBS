import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Product } from "../../types";

import style from "./cartComponent.module.css";

const CartComponent = ({ product }: { product: Product }) => {
  const { addQuantity, removeQuantity, removeProductFromCart } =
    useContext(AppContext);

  return (
    <>
      <div className={style.product}>
        <span>{product.category && product.category.toString()}</span>
        <span>{product.name}</span>
        <span>{product.price} $</span>
        <span>{product.quantity}</span>
        <div className={style.btn_wrapper}>
          {" "}
          <button
            className={style.btn}
            onClick={() => addQuantity && addQuantity(product)}
          >
            +1
          </button>
          <button
            className={style.btn}
            onClick={() => removeQuantity && removeQuantity(product)}
          >
            -1
          </button>
          <button
            className={style.btn}
            onClick={() =>
              removeProductFromCart && removeProductFromCart(product)
            }
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default CartComponent;

import { useContext } from "react"
import  AppContext  from "../../context/AppContext"
import { Product } from "../../types"


import style from './list.module.css' 

const ProductList = () => {
  const { products, addProductToCart, removeProductFromCart, cart } = useContext(AppContext)
  return (
    <div className={style.container}>
          <div className={style.list_container}>
            <header className={style.header}>
              <ul className={style.ul}>
                <li className={style.header_titles}>Category</li>
                <li className={style.header_titles}>Name</li>
                <li className={style.header_titles}>Price</li>
                <li className={style.header_titles}>Actions</li>
              </ul>
            </header>
            <div className={style.product_container}>
              {products &&
                products.map((product: Product) => {
                  return (
                    <div key={product.id} className={style.product}>
                      <span className={style.description}>
                        {product.category && product.category.toString()}
                      </span>
                      <span className={style.description}>{product.name}</span>
                      <span className={style.description}>
                        {product.price} $
                      </span>
                      <div className={style.btn_container}>
                        {cart && cart.find((item) => item.id === product.id) ? (
                          <button
                            className={style.button}
                            onClick={() =>
                              removeProductFromCart &&
                              removeProductFromCart(product)
                            }
                          >
                            Remove from cart
                          </button>
                        ) : (
                          <button
                            className={style.button}
                            onClick={() =>
                              addProductToCart && addProductToCart(product)
                            }
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
  )
}

export default ProductList
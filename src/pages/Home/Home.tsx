import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

import Filter from "../../components/Filter/Filter";
import ProductList from "../../components/ProductList/ProductList";
import style from "./home.module.css";

const Home = () => {
  const { isLoading, cart } = useContext(AppContext);

  if (isLoading) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color:'lightblue'
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <>
      <h1 className={style.app_title}>EBS TEST APP</h1>
      <Link to="/cart">
        <h3 className={style.cart_length}>Cart: {cart?.length}</h3>
      </Link>
      <div className={style.wrapper}>
        <Filter />

        <ProductList />
      </div>
    </>
  );
};

export default Home;

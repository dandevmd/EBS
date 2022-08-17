import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CartPage from "./pages/CartPage/CartPage"
import Home from "./pages/Home/Home";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/api/products"} element={<Home />} />
          <Route path={"/cart"} element={<CartPage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;

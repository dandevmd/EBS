import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { capitalizeFirstLetter } from "../../helpers";

import style from "./filter.module.css";

const Filter = () => {  
  const {
    categories,
    setSelectedPriceFilter,
    setSelectedCategoryFilter,
    filterProductsByPrice,
  } = useContext(AppContext);


  const selectFilterPricerByClick = (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const target = event.target as HTMLSpanElement;
    const content = target.textContent;
    content && setSelectedPriceFilter && setSelectedPriceFilter(content);
    content && filterProductsByPrice && filterProductsByPrice(content);
  };

  const selectFilterCategoryByClick = (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const target = event.target as HTMLSpanElement;
    const content = target.textContent;
    content && setSelectedCategoryFilter && setSelectedCategoryFilter(content);
  };

  return (
    <div className={style.filter}>
      <h3>FILTER BY</h3>
      <div className={style.filter_method}>
        <h4>Price</h4>
        <div className={style.list_wrapper}>
          <span
            id="increasing"
            className={style.category_item}
            onClick={(e) => selectFilterPricerByClick(e)}
          >
            Increasing
          </span>
          <span
            id="decreasing"
            className={style.category_item}
            onClick={(e) => selectFilterPricerByClick(e)}
          >
            Decreasing
          </span>
        </div>
      </div>

      <div className={style.filter_method}>
        <h4>Category</h4>
        <div className={style.list_wrapper}>
          {categories &&
            categories.map!((category) => (
              <span
                key={category.id}
                id={category.id}
                onClick={(e) => selectFilterCategoryByClick(e)}
                className={style.category_item}
              >
                {capitalizeFirstLetter(category.name)}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;

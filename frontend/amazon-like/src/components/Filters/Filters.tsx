import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../store";
import {
  setHigherPriceRangeFilter,
  setLowerPriceRangeFilter,
  setSearchNameFilter,
} from "../../store/productsReducer";
import { ChangeEvent } from "react";
import "./Filters.css";

const Filters = () => {
  const filters = useAppSelector((state) => state.products.filters);
  const priceRange = useAppSelector(
    (state) => state.products.filters.priceRange
  );
  const dispatch = useDispatch<AppDispatch>();
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch(setSearchNameFilter(e.target.value));
  }
  function handlePriceRangeChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.name === "highest") {
      dispatch(setHigherPriceRangeFilter(+e.target.value));
    }
    if (e.target.name === "lowest") {
      dispatch(setLowerPriceRangeFilter(+e.target.value));
    }
  }
  return (
    <div className="filters">
      <input
        className="filters_search"
        type="text"
        value={filters.nameSearch}
        onChange={handleSearchChange}
        placeholder="🔎"
      />
      <div className="filters_price-range_container">
        <p>
          De {priceRange.lowest} à {priceRange.highest}€
        </p>
        <input
          className="filters_price-range_lowest"
          name="lowest"
          type="range"
          value={priceRange.lowest}
          step={10}
          min={0}
          max={9999}
          onChange={handlePriceRangeChange}
        />
        <input
          className="filters_price-range_highest"
          type="range"
          name="highest"
          value={priceRange.highest}
          step={10}
          min={0}
          max={9999}
          onChange={handlePriceRangeChange}
        />
      </div>
    </div>
  );
};
export default Filters;

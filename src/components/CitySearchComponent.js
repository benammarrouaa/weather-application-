import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../ApiS";

const CitySearchComponent = ({ onSearchChange }) => {
  const [citySearch, setCitySearch] = useState("");
  // Change city
  const onChangeHandler = (searchData) => {
    setCitySearch(searchData);
    onSearchChange(searchData);
  };
  // Get city name
  const loadCityOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <AsyncPaginate
      className="input-city"
      placeholder="Enter a city"
      debounceTimeout={600}
      value={citySearch}
      onChange={onChangeHandler}
      loadOptions={loadCityOptions}
    />
  );
};
export default CitySearchComponent;

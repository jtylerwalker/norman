import * as N from "./src/model";
import axios from "axios";

const getWorldData = async () => {
  try {
    const json = axios.get(
      "http://api.worldbank.org/v2/countries/?format=json"
    );
    const countries = await json;

    console.log(modelCountries(countries)(N.all));
  } catch (e) {
    console.error(e);
  }
};

const modelCountries = countries => {
  const countriesModel = N.model(
    {
      id: "id",
      name: "name",
      capital: "capitalCity",
      region: ["adminregion", "value"],
      incomeLevel: ["incomeLevel", "value"],
      lat: "latitude",
      lon: "longitude"
    },
    countries.data[1]
  );

  return countriesModel;
};

getWorldData();

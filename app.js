import * as N from "./src/model";
import { all, sortBy } from "./src/model";
import axios from "axios";

const getWorldData = async () => {
  try {
    const json = axios.get(
      "http://api.worldbank.org/v2/countries/?format=json"
    );
    const countries = await json;

    console.log(Country(countries)(sortBy, "capital", "desc")(all));
  } catch (e) {
    console.error(e);
  }
};

const Country = countries => {
  const model = N.model(
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

  return model;
};

getWorldData();

import fs from "fs";
import * as aq from "arquero";
import clm from "country-locale-map";

const { op } = aq;

const catCsv = fs.readFileSync("src/data/climateactiontracker.csv", "utf8");
const inequalityCsv = fs.readFileSync("src/data/inequality.csv", "utf8");
const pennworldCsv = fs.readFileSync("src/data/pennworlddata.csv", "utf8");
const meatConsumptionCsv = fs.readFileSync(
  "src/data/meatconsumption.csv",
  "utf8"
);

// list of all country names (to exclude regions, continents etc)
const allCountries = clm.getAllCountries();
const allAlpha2 = allCountries.map((country) => country.alpha2);
const allAlpha3 = allCountries.map((country) => country.alpha3);

// shortlisted indicators from the CAT data
const catIndicators = [
  "Agriculture activity (total): consumption",
  "Agriculture activity (meat): consumption",
  "Electricity activity (per capita)",
  "New EV sales per million capita",
];

const NAME_OVERRIDES = {
  Brunei: "Brunei Darussalam",
  "Cape Verde": "Cabo Verde",
  "Cote d'Ivoire": "Côte d'Ivoire",
  "Democratic Republic of Congo": "Democratic Republic of the Congo",
  Laos: "Lao People's Democratic Republic",
  Syria: "Syrian Arab Republic",
  Timor: "Timor-Leste",
  Vietnam: "Viet Nam",
  // 'Zanzibar',
  "British Virgin Islands": "Virgin Islands (British)",
  Curacao: "Curaçao",
  "Micronesia (country)": "Micronesia",
  "Sint Maarten (Dutch part)": "Sint Maarten",
};

const meatTable = aq
  .fromCSV(meatConsumptionCsv)
  .rename(
    aq.names(
      "alpha3",
      "indicator",
      "type",
      "measure",
      "frequency",
      "year",
      "value"
    )
  )
  .groupby("alpha3", "year")
  .pivot("type", "value")
  .filter(aq.escape((d) => allAlpha3.includes(d.alpha3)))
  .derive(
    {
      alpha2: aq.escape((d) => clm.getAlpha2ByAlpha3(d.alpha3)),
      country_name: aq.escape((d) => clm.getCountryNameByAlpha3(d.alpha3)),
    },
    { before: "year" }
  );
const catTable = aq
  .fromCSV(catCsv)
  .filter(aq.escape((d) => catIndicators.includes(d.indicator)));

const inequalityTable = aq
  .fromCSV(inequalityCsv)
  .select("Entity", "Year", "Gini coefficient");

const pennworldTable = aq
  .fromCSV(pennworldCsv)
  .select(
    "Entity",
    "Year",
    "Population",
    "GDP (expenditure, multiple price benchmarks)",
    "Consumption of households and government (single price benchmark)",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Productivity: output per hour worked"
  );

const cleanCat = catTable
  .filter((d) => d.variable === "historic")
  .groupby("country", "year")
  .pivot("indicator", "value")
  .derive(
    {
      alpha3: aq.escape((d) => clm.getAlpha3ByAlpha2(d.country)),
      country_name: aq.escape((d) => clm.getCountryNameByAlpha2(d.country)),
    },
    { before: "year" }
  )
  .rename({ country: "alpha2" })
  .filter(aq.escape((d) => allAlpha2.includes(d.alpha2)));

const cleanJoined = pennworldTable
  .join_full(inequalityTable)
  .derive(
    {
      alpha2: aq.escape((d) => {
        const countryName = NAME_OVERRIDES[d.Entity] || d.Entity;
        const alpha2 = clm.getAlpha2ByName(countryName);
        return alpha2;
      }),
    },
    { before: "Year" }
  )
  .filter(aq.escape((d) => allAlpha2.includes(d.alpha2)))
  .derive(
    {
      alpha3: aq.escape((d) => clm.getAlpha3ByAlpha2(d.alpha2)),
      country_name: aq.escape((d) => clm.getCountryNameByAlpha2(d.alpha2)),
      "Consumption of households and government per capita": (d) =>
        d["Consumption of households and government (single price benchmark)"] /
        d.Population,
    },
    { before: "Year" }
  )
  .rename({ Year: "year" })
  .select(aq.not("Entity"))
  .join_full(meatTable);

const joinedData = cleanCat
  .join_full(cleanJoined)
  .orderby("alpha2", "year")
  .derive(
    {
      continent: aq.escape((d) => {
        const country = clm.getCountryByAlpha2(d.alpha2);
        return country.continent;
      }),
    },
    { before: "year" }
  )
  .filter((d) => d.year >= 1990 && d.year <= 2018 && d.Population);

// console.log(joinedData.columnNames());

const finalData = joinedData.objects().map((obj) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
});

// get names of columns
const names = joinedData.columnNames();

console.log(names);

const forMeatChart = aq
  .fromCSV(meatConsumptionCsv)
  .rename(
    aq.names(
      "alpha3",
      "indicator",
      "type",
      "measure",
      "frequency",
      "year",
      "value"
    )
  )
  .derive(
    {
      country_name: aq.escape((d) => clm.getCountryNameByAlpha3(d.alpha3)),
    },
    { before: "year" }
  )
  .groupby("type", "year")
  .pivot("country_name", "value");

forMeatChart.print();

fs.writeFileSync("src/data/joined.json", JSON.stringify(finalData, null, 2));

fs.writeFileSync(
  "src/data/meatChart.json",
  JSON.stringify(forMeatChart.objects(), null, 2)
);

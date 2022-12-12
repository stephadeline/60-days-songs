import fs from "fs";
import * as aq from "arquero";
import clm from "country-locale-map";

const { op } = aq;

const catCsv = fs.readFileSync("src/data/climateactiontracker.csv", "utf8");
const inequalityCsv = fs.readFileSync("src/data/inequality.csv", "utf8");
const pennworldCsv = fs.readFileSync("src/data/pennworlddata.csv", "utf8");

// list of all country names (to exclude regions, continents etc)
const allCountries = clm.getAllCountries();
const allAlpha2 = allCountries.map((country) => country.alpha2);

// shortlisted indicators from the CAT data
const catIndicators = [
  "Agriculture activity (total): consumption",
  "Agriculture activity (meat): consumption",
  "Electricity activity (per capita)",
  "Waste generation (per capita)",
  "Total fossil CO2 emission",
  "Oil and Gas activity: production",
  "Gas share in primary energy",
  "New EV sales per million capita",
];

// shortlisted column names from the inequality data
const inequalityColumns = ["Entity", "Year", "Gini coefficient"];

// shortlisted column names from the penn world data
const pennWorldColumns = [
  "Entity",
  "Year",
  "GDP (expenditure, multiple price benchmarks)",
  "Consumption of households and government (single price benchmark)",
  "Annual working hours per worker",
  "GDP per capita (expenditure, multiple price benchmarks)",
  "Productivity: output per hour worked",
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
    "GDP (expenditure, multiple price benchmarks)",
    "Consumption of households and government (single price benchmark)",
    "Annual working hours per worker",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Productivity: output per hour worked"
  );

const cleanCat = catTable
  .groupby("country", "year", "variable")
  .pivot(["indicator", "variable"], "value")
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
    },
    { before: "Year" }
  )
  .rename({ Year: "year" })
  .select(aq.not("Entity"));

const joinedData = cleanCat.join_full(cleanJoined).orderby("alpha2").objects();

const finalData = joinedData.map((obj) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
});

// fs.writeFileSync(
//   "src/data/cat.json",
//   JSON.stringify(cleanCat.objects(), null, 2)
// );
// fs.writeFileSync(
//   "src/data/inequality.json",
//   JSON.stringify(cleanInequality.objects(), null, 2)
// );
// fs.writeFileSync(
//   "src/data/pennworld.json",
//   JSON.stringify(cleanPennworld.objects(), null, 2)
// );
fs.writeFileSync("src/data/joined.json", JSON.stringify(finalData, null, 2));

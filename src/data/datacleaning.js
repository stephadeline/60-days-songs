import fs from "fs";
import * as aq from "arquero";
import clm from "country-locale-map";
const { op } = aq;

const catCsv = fs.readFileSync(
  "src/data/raw-data/climateactiontracker.csv",
  "utf8"
);
const inequalityCsv = fs.readFileSync(
  "src/data/raw-data/inequality.csv",
  "utf8"
);
const pennworldCsv = fs.readFileSync(
  "src/data/raw-data/pennworlddata.csv",
  "utf8"
);
const meatConsumptionCsv = fs.readFileSync(
  "src/data/raw-data/meatconsumption.csv",
  "utf8"
);

const incomeClass = fs.readFileSync(
  "src/data/raw-data/income-classification.csv",
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

// name overrides for those that have different country names
const NAME_OVERRIDES = {
  Brunei: "Brunei Darussalam",
  "Cape Verde": "Cabo Verde",
  "Cote d'Ivoire": "Côte d'Ivoire",
  "Democratic Republic of Congo": "Democratic Republic of the Congo",
  Laos: "Lao People's Democratic Republic",
  Syria: "Syrian Arab Republic",
  Timor: "Timor-Leste",
  Vietnam: "Viet Nam",
  "British Virgin Islands": "Virgin Islands (British)",
  Curacao: "Curaçao",
  "Micronesia (country)": "Micronesia",
  "Sint Maarten (Dutch part)": "Sint Maarten",
};

// reading the climate action tracker data into arquero
const catTable = aq
  .fromCSV(catCsv)
  // filtering the table to just the indicators we listed above
  .filter(aq.escape((d) => catIndicators.includes(d.indicator)))
  // filtering to just the historic data because we choose not to visualise the projections
  .filter((d) => d.variable === "historic")
  // grouping and turning the indicators into column names
  .groupby("country", "year")
  .pivot("indicator", "value")
  // standardising the table so that it includes alpha2, alpha3 and country_name
  .derive(
    {
      alpha3: aq.escape((d) => clm.getAlpha3ByAlpha2(d.country)),
      country_name: aq.escape((d) => clm.getCountryNameByAlpha2(d.country)),
    },
    { before: "year" }
  )
  .rename({ country: "alpha2" })
  // removing the "country names" that aren't really countries (like region names, world, etc)
  .filter(aq.escape((d) => allAlpha2.includes(d.alpha2)));

// reading the inequality data into arquero
const inequalityTable = aq
  .fromCSV(inequalityCsv)
  // selecting only the columns/variables we need.
  .select("Entity", "Year", "Gini coefficient", "Palma ratio (S90/S40 ratio)");

// reading income classification data
const incomeClassTable = aq
  .fromCSV(incomeClass)
  .rename({ "Income classifications (World Bank (2021))": "income_class" })
  .select("Entity", "Year", "income_class");

// reading the PennWorld data into arquero
const pennworldTable = aq
  .fromCSV(pennworldCsv)
  // selecting only the columns/variables we need.
  .select(
    "Entity",
    "Year",
    "Population",
    "GDP (expenditure, multiple price benchmarks)",
    "Consumption of households and government (single price benchmark)",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Productivity: output per hour worked"
  );

// reading the meat data into arquero
const meatTable = aq
  .fromCSV(meatConsumptionCsv)
  .filter((d) => d["MEASURE"] === "KG_CAP")
  // selecting only the columns/variables we need.
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
  );

// further processing the meat table
const meatForJoining = meatTable
  // grouping and using the meat type as the column names
  .groupby("alpha3", "year")
  .pivot("type", "value")
  // filtering to just the country names and standardising names
  .filter(aq.escape((d) => allAlpha3.includes(d.alpha3)))
  .derive(
    {
      alpha2: aq.escape((d) => clm.getAlpha2ByAlpha3(d.alpha3)),
      country_name: aq.escape((d) => clm.getCountryNameByAlpha3(d.alpha3)),
    },
    { before: "year" }
  );

// joining the datasets
const cleanJoined = pennworldTable
  .join_full(inequalityTable)
  .join_full(incomeClassTable)
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
  .select(
    aq.not(
      "Entity",
      "Consumption of households and government (single price benchmark)"
    )
  )
  .join_full(meatForJoining);

const joinedData = catTable
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
  .filter((d) => d.year >= 1990 && d.year <= 2018 && d.Population)
  // round the values for optimisation
  .derive({
    Population: (d) => op.round(d["Population"]),
    "Consumption of households and government per capita": (d) =>
      op.round(d["Consumption of households and government per capita"]),
    "GDP (expenditure, multiple price benchmarks)": (d) =>
      op.round(d["GDP (expenditure, multiple price benchmarks)"]),
    "GDP per capita (expenditure, multiple price benchmarks)": (d) =>
      op.round(d["GDP per capita (expenditure, multiple price benchmarks)"]),
    "Productivity: output per hour worked": (d) =>
      op.round(d["Productivity: output per hour worked"]),
    "Electricity activity (per capita)": (d) =>
      op.round(d["Electricity activity (per capita)"]),
  });

const finalData = joinedData.objects().map((obj) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
});

const countrySelection = [
  "Argentina",
  "Switzerland",
  "India",
  "China",
  "United States",
  "Indonesia",
];

// creating a separate data format for the small multiple meat types chart
const forMeatChart = meatTable
  .derive(
    {
      country_name: aq.escape((d) => clm.getCountryNameByAlpha3(d.alpha3)),
    },
    { before: "year" }
  )
  .filter(aq.escape((d) => countrySelection.includes(d.country_name)))
  // grouping by year and using the country as the column name.
  .groupby("type", "year")
  .pivot("country_name", "value");

fs.writeFileSync("src/data/joined.json", JSON.stringify(finalData, null, 2));

fs.writeFileSync(
  "src/data/meatChart.json",
  JSON.stringify(forMeatChart.objects(), null, 2)
);

// Trying to optimize the above data
// [
//   {
//   indicator: "GDP",
//   }

// ]
// 2. Group by countries

// end optimization

// Calculate percentage changes for Guifre's chart

const dataRename = finalData.map((d) => {
  let newd = {
    alpha2: d["alpha2"],
    alpha3: d["alpha3"],
    country: d["country_name"],
    continent: d["continent"],
    year: +d["year"],
    agriculture_meat_consumption:
      +d["Agriculture activity (meat): consumption"],
  };
  return newd;
});

// Function to calculate percentage change
function getPercentageChange(oldNumber, newNumber) {
  const value = newNumber - oldNumber;
  return (value / oldNumber) * 100;
}

// Filter the array to get only the elements of year 1991
let countriesInitialYear = dataRename.filter(function (country) {
  return country.year == 1991;
});

// Find matches in country name between the filtered array and the original one
let dataPercentages = dataRename.map(function (country) {
  var initialYear = countriesInitialYear.find(function (initialYearCountry) {
    return initialYearCountry.country === country.country;
  });
  if (initialYear) {
    // If there's a match, we create a new property (difference) with the percentage change
    var percentageChange = getPercentageChange(
      initialYear.agriculture_meat_consumption,
      country.agriculture_meat_consumption
    );
    return {
      ...country,
      difference: percentageChange,
    };
  } else {
    // If not, we return the original element without 'difference' property
    return country;
  }
});

let total_meat_2018 = dataPercentages
  .filter((d) => d.year == 2018)
  .filter((g) => g.agriculture_meat_consumption);

fs.writeFileSync(
  "src/data/totalMeatDifference.json",
  JSON.stringify(total_meat_2018, null, 2)
);

// Trying to optimize

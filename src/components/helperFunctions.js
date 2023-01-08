import { scaleOrdinal } from "d3-scale";
import { schemeTableau10 } from "d3-scale-chromatic";

export const units = {
  "Agriculture activity (meat): consumption": "kcal/cap/day",
  "Agriculture activity (total): consumption": "kcal/cap/day",
  "Electricity activity (per capita)": "kWh/cap",
  "New EV sales per million capita": "sales / M cap",
  "Consumption of households and government per capita": "$",
  BEEF: "kg/cap",
  PIG: "kg/cap",
  POULTRY: "kg/cap",
  SHEEP: "kg/cap",
  "GDP (expenditure, multiple price benchmarks)": "$",
  "GDP per capita (expenditure, multiple price benchmarks)": "$",
  "Productivity: output per hour worked": "$",
  "Gini coefficient": null,
  "Palma ratio (S90/S40 ratio)": null,
};

export const formatNum = function (n) {
  return n.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};

export const getFormattedValue = function (indicator, value) {
  let unit = units[indicator];
  if (unit === null) {
    return formatNum(value);
  } else if (unit === "$") {
    return unit + formatNum(value);
  } else {
    return formatNum(value) + " " + unit;
  }
};

export const getFormattedTick = function (indicator, value) {
  let unit = units[indicator];
  if (unit === null) {
    return value;
  } else if (unit === "$") {
    return unit + value;
  } else {
    return value + " " + unit;
  }
};

export const getUnitsFromIndicator = function (indicator) {
  return units[indicator];
};

export const colorScale = scaleOrdinal()
  .domain(["Asia", "Americas", "Europe", "Africa", "Oceania"])
  .range(schemeTableau10);

<script>
  import * as d3 from "d3";
  import data from "./data/joined.json";

  //Change names of properties

  const dataRename = data.map((d) => {
    let newd = {
      alpha2: d["alpha2"],
      alpha3: d["alpha3"],
      country: d["country_name"],
      continent: d["continent"],
      year: +d["year"],
      variable: d["variable"],
      annual_working_hours_per_worker: +d["Annual working hours per worker"],
      productivity: +d["Productivity: output per hour worked"],
      agriculture_meat_consumption:
        +d["Agriculture activity (meat): consumption_historic"],
      agriculture_total_consumption:
        +d["Agriculture activity (total): consumption_historic"],
      electricity_per_capita: +d["Electricity activity (per capita)_historic"],
      gas_share_primary_energy: +d["Gas share in primary energy_historic"],
      oil_gas_production: +d["Oil and Gas activity: production_historic"],
      consumption_per_capita: +d["consumption_per_capita"],
      population: +d["Population"],
      gdp: +d["GDP (expenditure, multiple price benchmarks)"],
      consumption_households_government:
        +d["Consumption of households and government (single price benchmark)"],
      gdp_per_capita:
        +d["GDP per capita (expenditure, multiple price benchmarks)"],
      gini: +d["Gini coefficient"],
      EV_sales: +d["New EV sales per million capita_historic"],
      waste_generation_CTI: +d["Waste generation (per capita)_CTI scenario"],
      waste_generation: +d["Waste generation (per capita)_historic"],
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

  //Bar chart with D3

  const margin = { top: 30, right: 20, bottom: 20, left: 40 }; //margin object
  const width = 900; //width of SVG in pixels
  const height = 400; //height of SVG in pixels
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  total_meat_2018
    .sort((a, b) => b.continent.localeCompare(a.continent))
    .sort((a, b) => b.difference - a.difference);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(total_meat_2018, (d) => d.difference),
      d3.max(total_meat_2018, (d) => d.difference),
    ])
    .range([height - margin.bottom, margin.top]);

  const xScale = d3
    .scaleBand()
    .domain(total_meat_2018.map((d) => d.alpha3))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const selection = svg.selectAll("rect");

  const colorScale = d3
    .scaleOrdinal()
    .domain(total_meat_2018.map((d) => d.continent))
    .range(d3.schemeCategory10);

  selection
    .data(total_meat_2018)
    .join("rect")
    .attr("x", (d) => xScale(d.alpha3))
    .attr("y", (d) => (d.difference < 0 ? yScale(0) : yScale(d.difference)))
    .attr("width", xScale.bandwidth() * 0.9)
    .attr("height", (d) => Math.abs(yScale(0) - yScale(d.difference)))
    .style("fill", (d) => colorScale(d.continent));

  const xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(xScale)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 10)
          .attr("y", -20)
          .attr("text-anchor", "end")
          .text("Frequency")
      );

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  const legend = svg
    .append("g")
    .attr(
      "transform",
      `translate(${width - margin.right - 120}, ${margin.top})`
    );

  const legendItems = legend
    .selectAll("g")
    .data(colorScale.domain())
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legendItems
    .append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", colorScale);

  legendItems
    .append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", "0.35em")
    .text((d) => d);

  legend
    .append("text")
    .attr("x", 0)
    .attr("y", -6)
    .attr("font-weight", "bold")
    .text("Continent");
</script>

<style>
</style>

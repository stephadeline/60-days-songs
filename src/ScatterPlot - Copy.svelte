<script>
  //import ScatterPlot from "./components/charts/Scatter.svelte";
  import data from "./data/joined.json";
  import * as d3 from "d3";
  import Select from "svelte-select";
  import { scaleOrdinal } from "d3-scale";
  import { schemeCategory10 } from "d3-scale-chromatic";
  import { onMount } from 'svelte';



  let svg;
  let margin = ({top: 60, right: 250, bottom: 40, left: 60}); //margin object
  $: width = 950; //width of SVG in pixels
  $: height = 600; //height of SVG in pixels


  const indicatorsX = [
    "gdp",
    "gdp_per_capita",
    "productivity",
    "gini"
  ]

  const indicatorsY = [
    "agriculture_meat_consumption",
    "agriculture_total_consumption",
    "electricity_per_capita",
    // "gas_share_primary_energy",
    "EV_sales",
    // "oil_gas_production",
    // "waste_generation_CTI",
    // "waste_generation",
    "consumption_per_capita"
  ]


  const continents = Array.from(new Set(data.map((d) => d.continent)));

  ////--------------------------------- Selectors ------------------------------------------------------------------

  $: selectedX = indicatorsX[0];
  $: selectedY = indicatorsY[0];
  ////--------------------------------- Filtering data  ------------------------------------------------------------------


  $: filteredData = data
    .filter((d) => d[selectedX])
    .map((d) => {
      let newData = {
        country_name: d["country_name"],
        continent: d["continent"],
        x: d["year"],
        y: d[selectedY],
      };
      return newData;
    });

  ////--------------------------------- circle scale depending on the variable population -------------------------------
  $: rScale = d3.scaleSqrt()
    .domain([0,d3.max(data, d => d.population)])
    .range([0, 50]) //circles, la grandària en quant a rang, tenint en compte lo domini

  //scale the axis depending on the information for each axis
  $: xScale = d3.scaleLog()//Log scales are similar to linear scales, except a logarithmic transform is applied to the input domain value before the output range value is computed. 
    .domain(d3.extent(data.map(d=>d[selectedX]))).nice() 
    .range([margin.left, width - margin.right])

  $: yScale = d3.scaleLinear()
    .domain([0,d3.max(data.map(d=>d[selectedY]))]).nice()
    .range([height-margin.bottom, margin.top])

  ////---------------------------------  Axis  ------------------------------------------------------------------
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))

  //Y axis based on the scale calculated before
  const yAxis =  g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale))

  ////--------------------------------- creating chart area ------------------------------------------------------------------

  svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox",[0, 0, width, height]);


  ////--------------------------------- text sqaure with information ---------------------------------
  const tooltip = d3.select('body') 
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '1')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '4px')
      .style('color', '#fff');

  //creating the axis
  /*const gx = svg.append("g")
    .call(xAxis);
  const gy = svg.append("g")
    .call(yAxis);
  */
  ////---------------------------------set color scheme ------------------------------------------------------------------

  const color = scaleOrdinal() 
    .domain(continents)
    .range(schemeCategory10)

  //--------------------------------- creating the circles ------------------------------------------------------------
  /*const selection = svg.selectAll("dot")
    .data(filteredData)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles" + d.continent })
      /*.attr('cx', d => xScale(d[selectedX]))
      .attr('cy', d => yScale(d[selectedY]))
      .attr('r', d => rScale(d.population))
      .style('fill', d=> color(d.continent))
      .style('opacity', 1)
      .style('stroke', "black")
      .style('stroke-width', '1')
    //interaccions en lo cursor
    .on("mouseover", function(d, i) {
      // change the selection style
      d3.select(this)
        .style('stroke-width', '4')
        .style('fill', "steelblue");
      const tooltipWidth = tooltip.node().offsetWidth;
      const tooltipHeight = tooltip.node().offsetHeight;
      tooltip
        .style("left", d.pageX - tooltipWidth +'px')
        .style("top", d.pageY-tooltipHeight - 10+'px') //això és per controlar lo gran que és lo requadre. Distància entre la pàgina i el ratolí
        .style('visibility', 'visible') //aquí el fem visible, en lo fromat que li hem dit abans
        .html(`<b>Country</b>: ${i.country} <br/>
              <b>${[selectedY]}</b>: ${i[selectedY].toLocaleString()} <br />  
              <b>Population</b>: ${i.population.toLocaleString('en-US', {maximumSignificantDigits: 3})}</br>
              <b>${[selectedX]}</b>: ${i[selectedX].toLocaleString('en-US', {maximumSignificantDigits: 3})}`);
    })
    .on("mouseout", function(d,i) {
      d3.select(this)
        .style('fill', d=> color(d.continent))
        .style('stroke-width', '1')
      tooltip.style('visibility', 'hidden')
    })
*/

  onMount(resize);

  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>


<div class=scatterplot>
  <h2>Scatterplot</h2>
  <div class=scatterplotSelectors>
    <h4>Select X inicator:</h4>
    <Select
      items={indicatorsX}
      value={indicatorsX[0]}
      bind:justValue={selectedX}
      clearable={false}
      showChevron
    />
    <h4>Select Y inicator:</h4>
    <Select
      items={indicatorsY}
      value={indicatorsY[0]}
      bind:justValue={selectedY}
      clearable={false}
      showChevron
    />
  </div>
</div>
  <!--<div> 
    <Scatter
      data={filteredData}
      />
  </div>
</div>-->

<div>
  <svg bind:this={svg}>
    <!-- y axis -->
    <g class='axis y-axis'>
      {#each selectedY as tick}
        <g class='tick tick-{tick}' transform='translate(0, {yScale(tick)})'>
          <line x1='{margin.left}' x2='{xScale(22)}'/>
          <text x='{margin.left - 8}' y='+4'>{tick}</text>
        </g>
      {/each}
    </g>

    <!-- x axis -->
    <g class='axis x-axis'>
      {#each selectedX as tick}
        <g class='tick' transform='translate({xScale(tick)},0)'>
          <line y1='{yScale(0)}' y2='{yScale(13)}'/>
          <text y='{height - margin.bottom + 16}'>{tick}</text>
        </g>
      {/each}
    </g>

    <!-- data -->
    {#each filteredData as d}
      <circle 
        cx='{xScale(d[selectedX])}' 
        cy='{yScale(d[selectedY])}' 
        r='{d.population}'
        fill= '{color(d.continent)}'
        fill-opacity= "1"
        stroke= "black"
        stroke-width= "1"
      />
    {/each}
  </svg>
</div>


<!--<h2>Scatter plot by Marina</h2>
<iframe width="100%" height="712" frameborder="0"
  src="https://observablehq.com/embed/f9b6545ddbf85d55@421?cells=viewof+selectedYear%2Cviewof+xVar%2Cviewof+yVar%2Ctaskplot"></iframe>
-->
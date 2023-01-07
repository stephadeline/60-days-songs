<script>
  //import ScatterPlot from "./components/charts/Scatter.svelte";
  import data from "./data/joined.json";
  import * as d3 from "d3";
  import Select from "svelte-select";
  import { scaleOrdinal } from "d3-scale";
  import { scaleLinear } from "d3-scale";
  import { scaleLog } from "d3-scale";
  import { schemeCategory10 } from "d3-scale-chromatic";
  import { onMount } from 'svelte';



 
  export let margin = ({top: 60, right: 250, bottom: 40, left: 60 });
  $: width = 1300; 
  $: height = 500; 

  ////--------------------------------- creating chart area ------------------------------------------------------------------

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox",[0, 0, width, height]);
    // const svg = d3
    // .select("#bar-chart")
    // .append("svg") // create svg in the div id bar-chart
    // // .create("svg")
    // .attr("width", width)
    // .attr("height", height)
    // .attr("viewBox", [0, 0, width, height]);

  ////--------------------------------- creating dropdown lists ------------------------------------------------------------------


  const indicatorsX = [
    "GDP (expenditure, multiple price benchmarks)",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Productivity: output per hour worked",
    "Gini coefficient",
  ]

  const indicatorsY = [
    "Agriculture activity (meat): consumption",
    "Agriculture activity (total): consumption",
    "Electricity activity (per capita)",
    // "gas_share_primary_energy",
    "Electricity activity (per capita)",
    // "oil_gas_production",
    // "waste_generation_CTI",
    // "waste_generation",
    "Consumption of households and government per capita"
  ]


  const continents = Array.from(new Set(data.map((d) => d.continent)));

  ////--------------------------------- Selectors ------------------------------------------------------------------

  $: selectedX = indicatorsX[0];
  $: selectedY = indicatorsY[0];
  ////--------------------------------- Filtering data  ------------------------------------------------------------------
  //console.log("selectedX "+selectedX)
  //console.log("selectedY "+selectedY)

  $: filteredData = data
    //.filter((d) => d[selectedX])
    .map((d) => {
      let newData = {
        country_name: d["country_name"],
        continent: d["continent"],
        x: d[selectedX],
        y: d[selectedY],
        year: d["year"]
      };
      return newData;
    });

    //console.log(filteredData)
    //console.log(data)
  ////--------------------------------- circle scale depending on the variable population -------------------------------
  $: rScale = d3.scaleSqrt()
    .domain([0,d3.max(data, d => d.population)])
    .range([0, 50]) //circles, la grandària en quant a rang, tenint en compte lo domini

  //scale the axis depending on the information for each axis
  $: xScale = scaleLog()//Log scales are similar to linear scales, except a logarithmic transform is applied to the input domain value before the output range value is computed. 
    .domain(d3.extent(data, d=>d[selectedX])).nice()
    //.domain(d3.extent(data, d=>d[selectedX]))
    .range([margin.left, width - margin.right])

  $: yScale = scaleLinear()
    .domain([0,d3.max(data, d=>d[selectedY])]).nice()
    .range([height-margin.bottom, margin.top])

  $: yTicks = yScale.ticks()
  $: xTicks = xScale.ticks() 
  ////---------------------------------set color scheme ------------------------------------------------------------------

  const color = scaleOrdinal() 
    .domain(continents)
    .range(schemeCategory10)




  ////--------------------------------- text square with information ---------------------------------
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

    /*
    ////---------------------------------  Axis  ------------------------------------------------------------------
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
  
    //Y axis based on the scale calculated before
    const yAxis =  g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
    */
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

  //onMount(resize);

  // function resize() {
  //   ({ width, height } = svg.getBoundingClientRect());
  // }
</script>

<!-- <p>
  {selectedX}
</p>
<p>
  {xScale(1000)}
</p> -->

<!-- <p>
  {xTicks}
</p>
<p>
  {yTicks}
</p> -->


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
  <svg   viewBox="0 0 {width} {height}" {width}  {height}>
  <!------------------- X axis -------------------------------------------------------------->
    <!-- <g class='axis' transform='translate(0,{height - margin.bottom})'> -->
    <g class='axis' transform='translate(0,{height - margin.bottom})'> 
      {#each xTicks as tick}
        <g class='axis x-axis' transform='translate({xScale(tick)},0)'>
          <!-- <line x1='{xScale(tick)}' x2='{height - margin.bottom}'/> -->
          <line 
            x1="0"
            y1={margin.top}
            x2="0"
            y2={height - margin.bottom}

            style="stroke: lightgrey"/>
          <text
            class="axis-text"
            x="-5"
            y="0"
            text-anchor="end"
            dominant-baseline="middle"
            >{tick}
          </text>
          <!-- <text x='{height - margin.bottom + 16}'>{tick}</text> -->
        </g>
      {/each}
    </g>
    <!-------------------------------- y axis -------------------------------------------------------->
    <g class='axis' transform='translate({margin.left},0)'>
      {#each yTicks as tick}
        <g class='tick' transform='translate(0,{yScale(tick)})'>
          <!-- <line y1='{yScale(tick)}' y2='{yScale(tick)}'/> -->
          <!-- <text y='{margin.left - 8}' y='+4'>{tick}</text> -->
          <line
            class="y-axis-lines"
            x1="0"
            y1="0"
            x2={width - margin.left - margin.right}
            y2="0"
            style="stroke: lightgrey"
          />
          <text
            class="axis-text"
            x="-5"
            y="0"
            text-anchor="end"
            dominant-baseline="middle"
            >{tick}
          </text>
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
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
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";




 
  export let margin = ({top: 60, right: 250, bottom: 40, left: 60 });
  $: width = 1300; 
  $: height = 500; 


  ////--------------------------------- creating chart area ------------------------------------------------------------------

  $: svg = d3.create("svg")
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
    // "gas_share_primary_energy",
    "Electricity activity (per capita)",
    // "oil_gas_production",
    // "waste_generation_CTI",
    // "waste_generation",
    "Consumption of households and government per capita"
  ]


  const continents = Array.from(new Set(data.map((d) => d.continent)));
  let years = Array.from(new Set(data.map((d) => d.year)));

  function handleOnChange(event) {
    //console.log(event.target.value)
    //console.log(filteredData)
    selectedYear = event.target.value
  }

  ////--------------------------------- Selectors ------------------------------------------------------------------
  $: selectedYear = years[0];
  $: selectedX = indicatorsX[0];
  $: selectedY = indicatorsY[0];
  ////--------------------------------- Filtering data  ------------------------------------------------------------------
  //console.log("selectedX "+selectedX)
  //console.log("selectedY "+selectedY)
  //console.log("years "+years)
  //console.log("selectedYear "+years[0])

  $: filteredData = data.filter(d=>d.country_name && d.year==selectedYear && d[selectedX] && d[selectedY])
    //.filter((d) => d[selectedX])
    .map((d) => {
      let newData = {
        country_name: d["country_name"],
        continent: d["continent"],
        pop:d['Population'],
        x: d[selectedX],
        y: d[selectedY],
        year: d.year
      };
      return newData;
    });
    
    $:{
      
      console.log(filteredData)
      console.info(selectedX,selectedY,selectedYear)
    }
    
  ////--------------------------------- circle scale depending on the variable population -------------------------------
  $: rScale = d3.scaleSqrt()
    //.domain([0,d3.max(data, d => d.population)])
    .domain([0,d3.max(filteredData, d => d['pop'])])
    .range([0, 50]) //circles, la grandària en quant a rang, tenint en compte lo domini

  //scale the axis depending on the information for each axis
  $: xScale = scaleLog()//Log scales are similar to linear scales, except a logarithmic transform is applied to the input domain value before the output range value is computed. 
    .domain(d3.extent(data, d=>d[selectedX]))
    .range([margin.left, width - margin.right])

  $: yScale = scaleLinear()
    .domain([0,d3.max(data, d=>d[selectedY])]).nice()
    .range([height-margin.bottom, margin.top])

  $: yTicks = yScale.ticks()
  $: xTicks = xScale.ticks(5) 
  //console.log(xTicks)
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

  let pinXAxis;
  let pinYAxis
  $: if (pinXAxis) {
    select(pinXAxis).call(
      axisBottom(xScale)
    );
  }

  $: if (pinYAxis) {
    select(pinYAxis).call(
      axisLeft(yScale)
    );
  }



</script>

 <!-- <p>
  {selectedX}
</p>-->
<!-- <p> 
  {xScale(1000)}
</p>  -->

<!-- <p>
  {xTicks}
</p>
<p>
  {yTicks}
</p> -->

<div>
  <p>
    <label>Year : 
      <input type=number bind:value={years} min=1990 max=2018 on:change={handleOnChange}>
      <input type=range bind:value={years} min=1990 max=2018 on:change={handleOnChange}>
    </label>
    {selectedYear}
  </p>
</div>

<div class=scatterplot>
  <h2>Scatterplot</h2>
  <div class=scatterplotSelectors>
    <h4>Select X indicator:</h4>
    <Select
      items={indicatorsX}
      value={indicatorsX[0]}
      bind:justValue={selectedX}
      clearable={false}
      showChevron
    />
    <h4>Select Y indicator:</h4>
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
  <!-- ----------------- X axis ------------------------------------------------------------ -->
    <!-- <g class='axis' transform='translate(0,{height - margin.bottom})'> -->
    <!--<g class='axis' transform='translate(0,{height - margin.bottom})'> -->

      <g
      class="xAxis"
      bind:this={pinXAxis}
      transform="translate(0,{height-margin.bottom})"
    />

    <g
    class="yAxis"
    bind:this={pinYAxis}
    transform="translate({margin.left},0)"
  />
  
  
    <!-- data -->
    {#each filteredData as d}
      <circle 
      cx='{xScale(d.x)}' 
      cy='{yScale(d.y)}' 
      r='{rScale(d['pop'])}'
        fill= {color(d.continent)}
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
  https://visualsvelte.com/d3/api/d3-axis
-->
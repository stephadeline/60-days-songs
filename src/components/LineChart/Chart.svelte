<script>
  import { scaleLog, scaleLinear, scaleOrdinal } from "d3-scale";
  import { max, min, extent, groups } from "d3-array";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { line } from "d3-shape";
  import AxisY from "./AxisY.svelte";

  export let data;
  export let label = "country_name";
  export let group = "continent";
  export let selectedLabel = [];
  export let selectedGroup = [];
  export let zoom = null;
  export let groupList;

  export let isLog = false;
  export let nTicksY = 5;


  export let margin = ({top: 10, right: 100, bottom: 20, left: 60});
  $: width = 600; 
  $: height = 200; 

  export let hasSelectors = false;


  $: selected = hasSelectors ? selectedLabel.length > 0 || selectedGroup.length > 0 : null

  $: groupedData = groups(data, d => d[label]);
  $: dataForScale = zoom && selected ? data.filter(d => selectedLabel.includes(d[label]) || selectedGroup.includes(d[group])) : data

  $: minY = isLog ? min(dataForScale, d => d.y) : 0
  $: maxY = max(dataForScale, d => d.y)

  $: maxX = max(dataForScale, d => d.x)

  $: yDomain = zoom && selected ? extent(dataForScale, d => d.y) : [minY, maxY]

  $: yScaleLinear = scaleLinear()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top])
    .nice();

  $: yScaleLog = scaleLog()
    .domain(yDomain)
    .range([height -margin.bottom, margin.top])
    .nice();

  $: yScale = isLog ? yScaleLog : yScaleLinear;

  $: colorScale = scaleOrdinal() 
    .domain(groupList)
    .range(schemeTableau10)

  $: xScale = scaleLinear()
    .domain(extent(data, d => d.x))
    .range([margin.left, width - margin.right])

  $: drawLine = line()
    .defined(d => !isNaN(d.y))
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));


  $: isSelected = function(l, g) {
     return selectedLabel.includes(l) || selectedGroup.includes(g) 
    }

  $: isMobile = width <= 500

  function getMaxofLabel(c) {
    const thisLabel = data.filter(d => d[label] === c && d.y)
    const maxOfLabel = Math.max(...thisLabel.map(d => d.x))
    return maxOfLabel;
  }

  $: drawLineNA = function(data) {
    const noData = data.filter(drawLine.defined())
    if (noData.length > 0) {
      return drawLine(noData)
    } else {
      return null;
    }
  }

  $: labeledData = data.filter(d => selectedLabel.includes(d[label]) && d.x === getMaxofLabel(d[label]))



</script>
<div class="line-chart-graphic" bind:clientWidth={width} bind:clientHeight={height}>

  <svg height={height} width={width} viewBox="0 0 {width} {height}">
    <AxisY {yScale} {xScale} {margin} {width} {height} {isMobile} {nTicksY}/>


    {#each labeledData as d}
    <text
      x={width - margin.right + 5}
      y={yScale(d.y)}
      alignment-baseline='middle'
      opacity=0.8
      fill={colorScale(d[group])}
      >
      {d[label]}
    </text>
    {/each}


    <g class="line-chart-clipped">
    {#each groupedData as d}
    <!-- dashed line for missing data -->
    {#if drawLineNA(d[1])}
    <path class="line-undefined"
        d={drawLineNA(d[1])}
        stroke={colorScale(d[1][0][group])}
        stroke-opacity={!selected ? 1 : isSelected(d[0], d[1][0][group]) ? 1 : 0}
        stroke-width={selected && isSelected(d[0], d[1][0][group]) ? 2 : 0.5}
        fill="none"
        stroke-dasharray="5,5"
      />
      {/if}
      <path
        d={drawLine(d[1])}
        stroke={colorScale(d[1][0][group])}
        stroke-opacity={!selected ? 1 : isSelected(d[0], d[1][0][group]) ? 1 : 0.2}
        stroke-width={selected && isSelected(d[0], d[1][0][group]) ? 2 : 1}
        fill="none"
      />
    {/each}
  </g>
    

  </svg>

</div>
  <style>
    .line-chart-graphic {
      height: 200px
    }
  </style>

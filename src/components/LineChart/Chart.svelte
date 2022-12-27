<script>
  import { scaleLog, scaleLinear, scaleOrdinal } from "d3-scale";
  import { max, extent, groups } from "d3-array";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { line } from "d3-shape";
  import AxisY from "./AxisY.svelte";

  export let data;
  export let label = "country_name";
  export let group = "continent";
  export let selectedLabel;
  export let selectedGroup;
  export let zoom;
  export let groupList;

  // export let yVar = 'Agriculture activity (meat): consumption';
  // export let xVar = "year";
  export let isLog = false;


  export let margin = ({top: 20, right: 120, bottom: 20, left: 60});
  export let width = 600; //width of SVG in pixels
  export let height = 200; //height of SVG in pixels

  $: selected = selectedLabel.length > 0 || selectedGroup.length > 0
  console.log(selected);

  $: groupedData = groups(data, d => d[label]);
  $: dataForScale = zoom && selected ? data.filter(d => selectedLabel.includes(d[label]) || selectedGroup.includes(d[group])) : data

  $: yScaleLinear = scaleLinear()
    .domain(extent(dataForScale, d => d.y))
    .range([height - margin.bottom, margin.top]);

  $: yScaleLog = scaleLog()
    .domain(extent(dataForScale, d => d.y))
    .range([height -margin.bottom, margin.top]);

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


</script>

  <svg height={height} width={width} viewBox="0 0 {width} {height}">
    <AxisY {yScale} {xScale} {margin} {width} {height} />

    {#each groupedData as d, i}
      <path
        d={drawLine(d[1])}
        stroke={colorScale(d[1][0][group])}
        stroke-opacity={!selected ? 1 : isSelected(d[0], d[1][0][group]) ? 1 : 0.2}
        stroke-width={isSelected(d[0], d[1][0][group]) ? 2 : 1}
        fill="none"
      />
    {/each}

    <!-- {#each selectedLabel as d, i}
    <text
      x={width - margin.right + 5}>
    </text> -->


  </svg>

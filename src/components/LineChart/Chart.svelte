<script>
  import { scaleLog, scaleLinear, scaleOrdinal } from "d3-scale";
  import { max, min, extent, groups } from "d3-array";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { Delaunay } from "d3-delaunay";
  import { line } from "d3-shape";
  import AxisY from "./AxisY.svelte";

  export let data;
  export let label = "country_name";
  export let group = "continent";
  export let selectedLabel = [];
  export let selectedGroup = [];
  export let zoom = false;
  export let groupList;
  export let maxYOverride = null;
  export let xKey = "Year";
  export let yKey = "Value";

  export let isLog = false;
  export let nTicksY = 5;

  export let margin = { top: 10, right: 100, bottom: 20, left: 60 };
  export let width = 600;
  export let height = 200;

  export let hasSelectors = false;
  let hovered;

  function formatNum(n) {
    return n.toLocaleString()
  }

  $: selected = selectedLabel.length > 0 || selectedGroup.length > 0

  $: groupedData = groups(data, (d) => d[label]);
  $: dataForScale =
    zoom && selected
      ? data.filter(
          (d) =>
            selectedLabel.includes(d[label]) || selectedGroup.includes(d[group])
        )
      : data;

  $: minY = isLog ? min(dataForScale, (d) => d.y) : 0;
  $: maxY = maxYOverride ? maxYOverride : max(dataForScale, (d) => d.y);

  $: yDomain =
    zoom && selected ? extent(dataForScale, (d) => d.y) : [minY, maxY];

  $: yScaleLinear = scaleLinear()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top]);

  $: yScaleLog = scaleLog()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top]);

  $: yScale = isLog ? yScaleLog : yScaleLinear;

  $: colorScale = scaleOrdinal().domain(groupList).range(schemeTableau10);

  $: xScale = scaleLinear()
    .domain(extent(data, (d) => d.x))
    .range([margin.left, width - margin.right]);

  $: drawLine = line()
    .defined((d) => !isNaN(d.y))
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

    function getMaxofLabel(c) {
    const thisLabel = data.filter((d) => d[label] === c && d.y);
    const maxOfLabel = Math.max(...thisLabel.map((d) => d.x));
    return maxOfLabel;
  }

  $: drawLineNA = function (data) {
    const noData = data.filter(drawLine.defined());
    if (noData.length > 0) {
      return drawLine(noData);
    } else {
      return null;
    }
  };

  $: labeledData = data.filter(
    (d) => selectedLabel.includes(d[label]) && d.x === getMaxofLabel(d[label])
  );

  $: points = data.map((d) => {
    const point = [xScale(d.x), yScale(d.y)];
    point.data = d;
    return point;
  });

  $: voronoi = Delaunay.from(points).voronoi([
    margin.left,
    margin.top,
    width - margin.right,
    height - margin.top - margin.bottom,
  ]);

  $: tooltipProperties = { x: "0", y: "0", data: {}, visibility: "hidden" };

  $: handleMouseover = function (d) {
    hovered = true;
    tooltipProperties.x = xScale(d.x);
    tooltipProperties.y = yScale(d.y);
    tooltipProperties.data = d;
    tooltipProperties.visibility = "visible";
  };

  $: handleMouseleave = function () {
    hovered = false;
    tooltipProperties.visibility = "hidden";
    tooltipProperties.data = {};
  };

  $: isHovered = function (l) {
    return tooltipProperties.data[label] === l;
  };

  $: isSelected = function (l, g) {
    return (
      selectedLabel.includes(l) || selectedGroup.includes(g) || isHovered(l)
    );
  };

  $: getStrokeProperties = function (l, g, dashed) {
    let strokeWidth;
    let opacity;
    let highlightStroke = 2;
    let normalStroke = dashed ? 0.5 : 1;
    let highlightOpacity = 1;
    let normalOpacity = dashed ? 0 : 0.2;

    if (hovered) {
      if (isHovered(l)) {
        opacity = highlightOpacity;
        strokeWidth = highlightStroke;
      } else {
        opacity = normalOpacity;
        strokeWidth = normalStroke;
      }
    } else if (selected) {
      if (isSelected(l, g)) {
        opacity = highlightOpacity;
        strokeWidth = highlightStroke;
      } else {
        opacity = normalOpacity;
        strokeWidth = normalStroke;
      }
    } else {
      opacity = highlightOpacity;
      strokeWidth = normalStroke;
    }

    return [opacity, strokeWidth];
  };

  $: isMobile = width <= 500;

</script>

<div
  class="line-chart-graphic"
  bind:clientWidth={width}
  bind:clientHeight={height}
  on:mouseleave={handleMouseleave}
>
  <svg {height} {width} viewBox="0 0 {width} {height}">
    <AxisY
      {yScale}
      {xScale}
      {margin}
      {width}
      {height}
      {isMobile}
      {nTicksY}
      xFormatted={false}
    />

    {#each labeledData as d}
      <text
        x={width - margin.right + 5}
        y={yScale(d.y)}
        alignment-baseline="middle"
        opacity="0.8"
        fill={colorScale(d[group])}
      >
        {d[label]}
      </text>
    {/each}

    <g class="line-chart-clipped">
      {#each groupedData as d}
        <!-- Draw dashed line for missing data if any -->
        {#if drawLineNA(d[1])}
          <path
            class="line-undefined"
            d={drawLineNA(d[1])}
            stroke={colorScale(d[1][0][group])}
            stroke-opacity={getStrokeProperties(d[0], d[1][0][group], true)[0]}
            stroke-width={getStrokeProperties(d[0], d[1][0][group], true)[1]}
            fill="none"
            stroke-dasharray="5,5"
          />
        {/if}
        <path
          d={drawLine(d[1])}
          stroke={colorScale(d[1][0][group])}
          stroke-opacity={getStrokeProperties(d[0], d[1][0][group], false)[0]}
          stroke-width={getStrokeProperties(d[0], d[1][0][group], false)[1]}
          fill="none"
        />
      {/each}
    </g>
    <g class="voronoi">
      {#each points as point, i}
        <path
          fill="none"
          stroke="none"
          class="voronoi-cell"
          d={voronoi.renderCell(i)}
          style="pointer-events: all;"
          on:mouseover={handleMouseover(point.data)}
        />
      {/each}
    </g>

    {#if tooltipProperties.data.y}
    <g
      class="linechart-tooltip"
      style="visibility: {tooltipProperties.visibility}"
    >
      <circle cx={tooltipProperties.x} cy={tooltipProperties.y} r={3} fill={colorScale(tooltipProperties.data[group])} ></circle>
      <text x={tooltipProperties.x} y={tooltipProperties.y + 18} style="stroke:#ffffff;stroke-width:1px;paint-order: stroke;" text-anchor="middle">
        <tspan style="font-weight: bold; font-size:15px;"
          >{tooltipProperties.data[label]}</tspan
        >
        <tspan
          x={tooltipProperties.x}
          y={tooltipProperties.y + 36}
          style="font-size:13px;"
          >
          <tspan style="font-weight: bold;">{yKey}</tspan>: {formatNum(tooltipProperties
            .data.y)}</tspan
        >
        <tspan
          x={tooltipProperties.x}
          y={tooltipProperties.y + 36 + 18}
          style="font-size:13px;"
          ><tspan style="font-weight: bold;">{xKey}</tspan>: {tooltipProperties
            .data.x}</tspan
        >
      </text>
    </g>
    {/if}
  </svg>
</div>

<style>
  .line-chart-graphic {
    height: 200px;
    max-width: 100vw;
  }
</style>

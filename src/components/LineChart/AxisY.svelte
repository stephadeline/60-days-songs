<script>
  export let yScale;
  export let margin;
  export let width;
  export let height;
  export let nTicksY = 5;
  export let grid = true;
  export let xScale;
  export let isMobile = false;
  export let nTicksX = 10;
  export let xFormatted = true;
  export let yKey;
  import {
    getUnitsFromIndicator
  } from "./../helperFunctions.js";

  $: unit = getUnitsFromIndicator(yKey)


  $: setnTicksX = isMobile ? 3 : nTicksX;
  $: yTicks = yScale.ticks(nTicksY)
  $: xTicks = xScale.ticks(setnTicksX)

  $: yTickMax = Math.max(...yTicks)

  $: formatTick = (tick) => 
    unit === "$" && tick === yTickMax ? unit + formatNum(tick) : formatNum(tick)
  


function formatNum(num) {
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
     }
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
     }
     return num;
}



</script>

  {#each xTicks as tick}
    <g class="axis" transform="translate({xScale(tick)}, 0)">
      {#if grid}
        <line
          class="x-axis-lines"
          x1="0"
          y1={margin.top}
          x2="0"
          y2={height - margin.bottom}
          style="stroke: lightgrey"
        />
      {/if}
      <text
        class="axis-text"
        x="0"
        y={height - 5}
        text-anchor="middle"
        dominant-baseline="middle"
        >{xFormatted ? formatNum(tick) : tick}
      </text>
    </g>
  {/each}

  <g class="axis" transform="translate({margin.left}, 0)">
    {#each yTicks as tick}
      <g class="axis" transform="translate(0, {yScale(tick)})">
        {#if grid}
          <line
            class="y-axis-lines"
            x1="0"
            y1="0"
            x2={width - margin.left - margin.right}
            y2="0"
            style="stroke: lightgrey"
          />
        {/if}
        <text
          class="axis-text"
          x="-5"
          y="0"
          text-anchor="end"
          dominant-baseline="middle"
          >{formatTick(tick)}
        </text>


        {#if unit && unit !== "$" && tick === yTickMax }
        <text
          class="axis-text"
          style="stroke:#ffffff;stroke-width:3px;paint-order: stroke;"
          x="-3"
          y="0"
          text-anchor="start"
          dominant-baseline="middle"
          >{unit}
        </text>

        {/if}
      </g>
    {/each}
  </g>

<style>
  text.axis-text {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8em;
  }
</style>

<script>
  export let yScale;
  export let margin;
  export let width;
  export let height;
  export let nTicks = 5;
  export let grid = true;
  export let xScale;
  $: yTicks = yScale.ticks(nTicks);
  $: xTicks = xScale.ticks();
  console.log(xScale.ticks())

function formatNum(num) {
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
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
        >{formatNum(tick)}
      </text>
    </g>
  {/each}
</g>

<!-- <g class="axis" transform="translate({margin.left}, 0)"> -->
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
        >{tick}
      </text>
    </g>
  {/each}
  <!-- </g> -->


<style>
  text.axis-text {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8em;
  }
</style>

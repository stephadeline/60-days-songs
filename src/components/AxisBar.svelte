<script>
  export let scale;
  export let margin;
  export let width;
  export let nTicks = 5;
  export let grid = true;
  $: ticks = scale.ticks(nTicks);
</script>

<g class="axis" transform="translate({margin.left}, 0)">
  {#each ticks as tick}
    <g class="axis" transform="translate(0, {scale(tick)})">
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
        >{tick}
      </text>
    </g>
  {/each}
</g>

<style>
  text.axis-text {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8em;
  }
</style>

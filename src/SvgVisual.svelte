<script>
    import * as d3 from 'd3';
    import Clouds from './assets/Clouds.svelte';
    import Rays from './assets/Rays.svelte';
    import data from "./data/data.json"

  // export let rootFolder = "src/assets"
  // export let platform = 'sunshine-icons-final'
  //   d3.xml(`${rootFolder}/${platform}.svg`)
  //   .then(data => {
  //     d3.select("#svg-container").node().append(data.documentElement)
  //   });


  // export let days = Array(60);
  export let nClouds = Array(4)
  // export let height = 50;
  // export let width = 50;

  let isMobile = screen.width <= 400
  
  // let gap = 30;

  let row = isMobile ? 12 : 6

  let nSunsPerRow = 60/row

  $: prop = isMobile ? 1 : 0.5

  $: height = screen.height * prop / row
  $: width = screen.width * 0.7 / nSunsPerRow
  $: dimension = height < width ? height : width;
  $: cx = dimension/2
  $: cy = dimension/2
  $: sunR = dimension * 0.3;

  export let index = 1

</script>

{#if index <= 1} 
<svg height={screen.height/2} width={screen.width/2} viewBox="0 0 {screen.width/2} {screen.height/2}">
  <circle cx={screen.width/4} cy={screen.height/4} r={200} fill="#FFCB04"></circle>
  <!-- <Rays {dimension}  {index}/> -->
  <Clouds dimension={500} before={2} after={4}/>
</svg>

{:else if index > 1}
<div class="grid-container" style={"height: " + (screen.height)}>
{#each data as d, i} 
<div class="grid-item">
<svg height={dimension} width={dimension} viewBox="0 0 {dimension} {dimension}">
  <circle cx={cx} cy={cy} r={sunR} fill="#FFCB04"></circle>
  <Rays {dimension} gender={d.gender} {index}/>
  <Clouds {dimension} before={d.before} after={d.after}/>
</svg>
</div>
{/each}
</div>
{/if}

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(10, 1fr);
    gap: 20px;

  }

}
</style>
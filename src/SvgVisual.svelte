<script>
  import * as d3 from "d3";
  import Clouds from "./assets/Clouds.svelte";
  import Rays from "./assets/Rays.svelte";
  import data from "./data/data.json";
  import { fade, fly, blur } from "svelte/transition";

  // export let rootFolder = "src/assets"
  // export let platform = 'sunshine-icons-final'
  //   d3.xml(`${rootFolder}/${platform}.svg`)
  //   .then(data => {
  //     d3.select("#svg-container").node().append(data.documentElement)
  //   });

  // export let days = Array(60);
  // export let height = 50;
  // export let width = 50;

  let isMobile = screen.width <= 500;

  // let gap = 30;

  let row = isMobile ? 12 : 6;

  let nSunsPerRow = 60 / row;

  $: prop = isMobile ? 1 : 0.5;

  $: height = (screen.height * prop) / row;
  $: width = (screen.width * 0.7) / nSunsPerRow;
  $: dimension = height < width ? height : width;
  $: cx = dimension / 2;
  $: cy = dimension / 2;
  $: sunR = dimension * 0.3;

  $: introWidth = screen.width / 2
  $: introHeight = screen.height / 2

  $: introDim = introHeight < introWidth ? introHeight : introWidth;

  $: introCx = introDim / 2

  $: introCy = introDim / 3

  $: introR = introDim / 3 

  $: introCloudDim = introHeight

  $: introTransform = isMobile ? "translate(0, -45)" : "translate(0, -90)"
  export let index = 1;
</script>

{#if index === 0}
  <h2 out:fade style="font-size: 100px">08:00</h2>
  <button out:fade class="alarm-button">Wake up!</button>
{:else if index > 0 && index <= 4}
<div class="intro-viz">
  <svg
    height={introDim}
    width={introDim}
    viewBox="0 0 {introDim} {introDim}"
  >
    <circle
    in:fly={{ y: 1000, duration: 2000 }}
    out:fade
      cx={introCx}
      cy={introCy}
      r={introR}
      fill="#FFCB04"
    />
    {#if index >= 2 && index <= 3}
    <g in:blur out:blur transform={introTransform}>
    <Clouds height={introDim} width={introDim} before={2} after={2} />
    </g>
    {/if}
    {#if index === 4}
    <g out:blur transform={introTransform}>
    <Clouds height={introDim} width={introDim} before={2} after={4} />
    </g>
    {/if}
  </svg>
</div>

{:else if index > 4}
  <div
    transition:fade
    class="grid-container"
    style={"height: " + screen.height}
  >
    {#each data as d, i}
      <div class="grid-item">
        <svg
          height={dimension}
          width={dimension}
          viewBox="0 0 {dimension} {dimension}"
        >
          <circle {cx} {cy} r={sunR} fill="#FFCB04" />
          <Rays gender={d.gender} {index} {dimension} rotating={d.sing_along === "Yes"}/>
          <Clouds height={dimension} width={dimension} before={d.before} after={d.after} />
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

  .alarm-button {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 70vh;
    text-align: center;
    width: 200px;
    border-radius: 50px;
    background: orange;
    color: white;
  }

  .intro-viz svg {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 25%);

    @media screen and (max-width: 500px) {
      transform: translate(-50%, 50%);

    }
    // width: 100vw;
    // height: 100vh;
  }
</style>

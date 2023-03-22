<script>
  import * as d3 from "d3";
  import Clouds from "./Clouds.svelte";
  import Rays from "./Rays.svelte";
  import data from "../data/data.json";
  import { fade, fly, blur } from "svelte/transition";

  export let allowAudio = false;

  let audioCollection = Array.from(data.length);
  let songTitle = Array.from(data.length);

  let singAlongCollection = Array.from(data.length);


  let isMobile = screen.width <= 500;

  let row = isMobile ? 12 : 6;

  let nSunsPerRow = 60 / row;

  $: prop = isMobile ? 1 : 0.5;

  $: height = (screen.height * prop) / row;
  $: width = (screen.width * 0.7) / nSunsPerRow;
  $: dimension = height < width ? height : width;
  $: cx = dimension / 2;
  $: cy = dimension / 2;
  $: sunR = dimension * 0.3;

  $: introWidth = screen.width / 2;
  $: introHeight = screen.height / 2;

  $: introDim = introHeight < introWidth ? introHeight : introWidth;

  $: introCx = introDim / 2;

  $: introCy = introDim / 3;

  $: introR = introDim / 3;

  $: introCloudDim = introHeight;

  $: introTransform = isMobile ? "translate(0, -45)" : "translate(0, -90)";

  // $: if (allowAudio === true) {
  //     if (index === 4) {
  //     songSample.play();
  //   }
  // }
  export let index = 1;

  $: playAudio = function (i) {
    songTitle[i].style.opacity = 1;

    var song = index === 9 ? audioCollection[i] : index === 14 ? singAlongCollection[i] : null

    if (allowAudio === true) {
     song.play()
    }
  };

  $: stopAudio = function (i) {
    songTitle[i].style.opacity = 0;
    var song = index === 9 ? audioCollection[i] : index === 14 ? singAlongCollection[i] : null

    if (!song.paused) {
      song.pause();
    }
  };
</script>

{#if index === 0}
  <h2 out:fade style="font-size: 100px; padding: 50px;">08:00</h2>
{:else if index > 0 && index <= 4}
  <div class="intro-viz">
    <svg
      height={introDim}
      width={introDim}
      viewBox="0 0 {introDim} {introDim}"
      in:fade={{ duration: 500, delay: 500 }}
    >
      <circle
        in:fly={{ y: 1000, duration: 1500 }}
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
  <!-- <h3>Now playing</h3> -->

  <div
    transition:fade
    class="grid-container"
    style={"height: " + screen.height}
  >
    {#each data as d, i}
      <div
        class={"grid-item-" + index}
        on:mouseenter={playAudio(i)}
        on:mouseleave={stopAudio(i)}
        on:touchstart={playAudio(i)}
        on:touchend={stopAudio(i)}
        class:nosingalong={index === 14 && d.sing_along !== "Yes"}
      >
        <svg
          height={dimension}
          width={dimension}
          viewBox="0 0 {dimension} {dimension}"
        >
          <g class:overlay={index === 5} transition:fade>
            <circle {cx} {cy} r={sunR} fill="#FFCB04" />
            <Rays
              gender={d.gender}
              {index}
              {dimension}
              rotating={d.sing_along === "Yes"}
            />
            {#if index > 6}
              <Clouds
                height={dimension}
                width={dimension}
                before={d.before}
                after={d.after}
                {index}
              />
            {/if}
          </g>
        </svg>
        <div class="song-title" bind:this={songTitle[i]}>
          <p>{d.title}</p>
        </div>
      </div>
      {#if index === 9 && d.preview}
        <audio src={d.preview} bind:this={audioCollection[i]} />
      {/if}
      {#if index === 14 && d.sing_along}
      <audio src={"src/assets/audio/" + d.sing_along_track + ".mp3"} bind:this={singAlongCollection[i]} />
    {/if}
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

  .intro-viz svg {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 25%);

    @media screen and (max-width: 500px) {
      transform: translate(-50%, 50%);
    }
  }

  g.overlay {
    opacity: 30%;
  }

  [class^="grid-item"] {
    position: relative;
  }
  .grid-item-9 {
    opacity: 80%;

    &:hover {
      opacity: 100%;
    }
  }

  .song-title {
    font-size: 12px;
    line-height: 12px;
    position: absolute;
    // top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 0;
    text-align: center;
    margin: 0 !important;
    padding: 0px !important;

    color: black;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
      1px 1px 0 white;
    opacity: 0;
  }
  .nosingalong {
    opacity: 0.2;
  }
</style>

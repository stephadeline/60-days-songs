<script>
  import * as d3 from "d3";
  import Clouds from "./Clouds.svelte";
  import Rays from "./Rays.svelte";
  import data from "../data/data.json";
  import { fade, fly, blur } from "svelte/transition";

  export let allowAudio = false;

  export let scrollIntoView;

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

{#if index <= 1}

<div class="intro">
  <h2 out:fade style="font-size: 100px; padding: 50px;">07:00</h2>
  <p>Mornings are <b>the worst.</b></p>
</div>

  {#if index === 0}

<div class="scroll-down" transition:fade>
  <div class="mouse-body">
    <div class="mouse-wheel"></div>
  </div>
  <p>SCROLL DOWN</p>
</div>
  {/if}

{#if index === 1}
<a href="#section-3" on:click|preventDefault={scrollIntoView}>

    <button transition:fade class="alarm-button"
    >Wake up!</button
    >
    </a>
    {/if}
{:else if index > 1 && index <= 4}
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
      {#if index === 2}
        <g in:blur={{delay: 2000, duration: 1000}} out:blur transform={introTransform}>
          <Clouds height={introDim} width={introDim} before={2} after={2} />
        </g>
      {/if}
      {#if index === 3 || index === 4}
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
        {#if index >= 9 && d.preview}
        <div class="song-title" bind:this={songTitle[i]}>
          <p>{d.title}</p>
        </div>
        {/if}
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
    svg {
    pointer-events: all;
    }
    p {
      pointer-events: none;
    }
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

  .alarm-button {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 60vh;
    text-align: center;
    width: 200px;
    border-radius: 50px;
    background: orange;
    color: white;
    animation: shake-animation 3s ease infinite;
  transform-origin: 50% 50%;
  }

  @keyframes shake-animation {
   0% { transform:translate(0,0) }
  1.78571% { transform:translate(10px,0) }
  3.57143% { transform:translate(0,0) }
  5.35714% { transform:translate(10px,0) }
  7.14286% { transform:translate(0,0) }
  8.92857% { transform:translate(10px,0) }
  10.71429% { transform:translate(0,0) }
  12.92857% { transform:translate(10px,0) }
  14.71429% { transform:translate(0,0) }
  15.92857% { transform:translate(10px,0) }
  17.71429% { transform:translate(0,0) }
  100% { transform:translate(0,0) }
}
  .scroll-down {
    font-size: 12px;
    color: white;
    position: absolute;
    top: 70vh;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;


  }

  .mouse-body{
    border-style: solid;
    border-width: 1px;
    border-color: white;
    border-radius: 32px;
    z-index: 9;
    height: 30px;
    width: 16px;
    margin: 0 auto 10px;

    .mouse-wheel {
      border-width: 1px;
    border-color: #333;
    border-radius: 50%;
    background-color: white;
    position: relative;
    height: 2px;
    width: 2px;
    margin: 0 auto;
    -webkit-animation: wheel_animation 1.5s linear infinite;
    animation: wheel_animation 1.5s linear infinite;
    }
    }

    @keyframes wheel_animation {
      0% {
    opacity: 0;
    top: 2px;
}
50% {
    opacity: 1;
    top: 50%;
}
100% {
    opacity: 0;
    top: 23px;
}
    }

    .intro {
      color: white;
      font-size: 16px;
      pointer-events: none;
    
    }

</style>

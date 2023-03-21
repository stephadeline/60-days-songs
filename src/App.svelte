<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import LoremIpsum from "./LoremIpsum.svelte";
  // import DraggableLabel from './DraggableLabel.svelte';
  import Visual from "./components/SvgVisual.svelte";
  import AudioText from "./components/AudioText.svelte";

  import { fade, fly, blur } from "svelte/transition";


  function scrollIntoView({ target }) {
    const el = document.getElementById("section-2");
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }
  let count;
  let index;
  let offset = 0;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;

  let allowAudio = false;
  let alertWindow = true;
  let alarmAudio;
	let answer;

  function enableAudio() {
    alertWindow = false;
    allowAudio = true;
		if (index <= 0) {
    alarmAudio.play();
		}
  }


  function disableAudio() {
    alertWindow = false;
  }

  $: if (index && index > 0) {
    alarmAudio.pause();
  }

  // $: if (alertWindow === true) {
  //   window.onscroll = function () {
  //     window.scrollTo(0, 0);
  //   };
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "scroll";
  //   window.onscroll = function () {};
  // }


</script>

{#if alertWindow === true}
  <div class="alert-audio">
    <p>This experience is better with audio.</p>
    <button on:click={enableAudio}>Click to enable audio</button>
    <!-- <p><a on:click={disableAudio}>No audio please!</a></p> -->
  </div>
{/if}

<div class="demo" class:disableforeground={index === 9 || index === 14}>

  <Scroller
    {top}
    {threshold}
    {bottom}
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background">
      <Visual {index} {allowAudio} />
    </div>

    <div slot="foreground" class={"foreground-" + index}>
      <section>
        <p class="scrolly-text intro">Mornings are <b>the worst.</b></p>
        <a href="#section-2" on:click|preventDefault={scrollIntoView}>
          <button out:fade class="alarm-button" on:click={alarmAudio.pause()}
            >Wake up!</button
          >
        </a>
        <audio
          src="src/assets/audio/alarm.mp3"
          id="alarm-mp3"
          bind:this={alarmAudio}
        >
          Your browser does not support the HTML5 Audio element.
        </audio>
      </section>
      <section id="section-2">
        <p class="scrolly-text">
          No matter how much I've tried, I could never be a morning person.
        </p>
      </section>
      <section>
        <p class="scrolly-text">
          Most days I wake up greeted by <AudioText
            audioIndex={2}
            {index}
            {allowAudio}
            src="src/assets/audio/noise2.mp4"
            text="so much noise"
          />, which clouds my day and prevent me from seeing the sun.
        </p>
      </section>
      <section>
        <p class="scrolly-text">
          But <AudioText
            audioIndex={3}
            {index}
            {allowAudio}
            src="https://p.scdn.co/mp3-preview/2cdf5bc166d9d6231af6c5e00d2f2e35e78e2851?cid=774b29d4f13844c495f206cafdad9c86"
            text="listening to music"
          /> helps. Most days, it can help to make some of the clouds go away.
        </p>
      </section>
      <section>
        <p class="scrolly-text">
          And it definitely has made the last 60 days <strong
            >a little less crappy</strong
          >.
        </p>
      </section>

      <section class="headline">
        <h1><strong>#60DaysOf</strong> Songs that start my day</h1>
        <p>By Stephanie Adeline</p>
      </section>

      <section>
        <p class="scrolly-text">
          The last 60 days, I tracked my mood on a scale of 1 to 5 and the first
          song I listened to each day. [insert explanation on mood]
        </p>
      </section>

      <section>
        <p class="scrolly-text">This is how I felt when I woke up.</p>
      </section>

      <section>
        <p class="scrolly-text">This is how listening to music helped</p>
      </section>

      <section>
        <p class="scrolly-text">
          Hover over the suns to hear the song I listened to that day. {index}
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          One artist in particular stood out the most. Can you guess which one?
        </p>
				<button on:click={() => answer = "Miley Cyrus"}>Miley Cyrus</button>
				<button on:click={() => answer = "Taylor Swift"}>Taylor Swift</button>
				<button on:click={() => answer = "NIKI"}>NIKI</button>
				{#if answer}
				<p>You guessed <strong>{answer}</strong>. Scroll to see if you got that right!</p>
				{/if}
      </section>

      <section>
        <p class="scrolly-text">
					<AudioText
					audioIndex={11}
					{index}
					{allowAudio}
					src="https://p.scdn.co/mp3-preview/3e9b012da3f78d1f1a54c96db15d27335b28d985?cid=774b29d4f13844c495f206cafdad9c86"
					text="It was NIKI!"
				/> Fun fact: she was also my top artist on last year's Spotify wrapped. But Miley and Taylor were close! [insert chart]
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          Here's another little pleasant surprise. Most of the songs I listened to in the morning were sung by female vocalists. [key here]
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          Singing along is also helps to improve my mood! It's on those days where I sang along did I feel my best.
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          I'm usually self-conscious about my early-morning singing voice, but... hover over the suns to listen to get a glimpse of my mornings :)
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{index + 1}
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{index + 1}
        </p>
      </section>

      <section>
        <p class="scrolly-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{index + 1}
        </p>
      </section>
      <section>
        <p class="scrolly-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{index + 1}
        </p>
      </section>
    </div>
  </Scroller>

  <!-- <LoremIpsum/> -->
</div>

<style lang="scss">
  div.alert-audio {
    // background: rgba(0, 0, 0, 0.8);
    color: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1000;
    max-width: 400px;
    // padding: 200px;
		font-size: 12px;
		button {
			padding: 5px 10px;;
		}
  }

  .alert-audio a {
    text-decoration: underline dotted;
    color: white;
  }
  .demo {
    /* background-color: #7FB1CB; */
    width: 100%;
  }

  [slot="background"] {
    /* background-color: rgba(255,62,0,0.05);
		border-top: 2px solid #ff3e00;
		border-bottom: 2px solid #ff3e00; */
    font-size: 1.4em;
    overflow: hidden;
    padding: 1em;
    pointer-events: all !important;
  }

  section {
    height: 120vh;
    /* background-color: rgba(0,0,0,0.5);
		color: white; */
    padding: 1em;
    margin: 0 auto;
    max-width: 400px;
  }

  .scrolly-text {
    margin-top: 50vh;
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    text-align: left;
    padding: 10px;
    max-width: 400px;
  }
  .intro {
    background: none;
    color: white;
    text-align: center;
  }

  [slot="background"] {
    pointer-events: none;
  }

  [slot="foreground"] {
    pointer-events: all;
  }
  .demo {
    pointer-events: none;
  }

  .disableforeground {
    [slot="background"] {
      pointer-events: all;
    }

    [slot="foreground"] {
      pointer-events: none;
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
</style>

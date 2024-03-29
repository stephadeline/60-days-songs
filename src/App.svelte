<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Visual from "./components/SvgVisual.svelte";
  let count;
  let index;
  let offset = 0;
  let progress;
  let top = screen.width >= 500 ? 0.1 : 0.05;
  let threshold = 0.8;
  let bottom = 0.9;
  let section3;

  let highlightedGender = null;
  let highlightedMood = null;

  let allowAudio = false;
  let alertWindow = true;
  let alarmAudio;
  let noiseAudio;
  let mileyAudio;
  let taylorAudio;
  let beyonceAudio;
  let answer;
  $: audioIcon = allowAudio
    ? "src/assets/icon_audio-on.svg"
    : "src/assets/icon_audio-off.svg";

  function scrollIntoView({ target }) {
    const el = section3;
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });

    alarmAudio.pause();
  }
  function enableAudio() {
    alertWindow = false;
    allowAudio = true;
  }

  function disableAudio() {
    alertWindow = false;
  }

  $: audioToggle = () => {
    if (allowAudio === true) {
      allowAudio = false;
      audios.forEach((a) => a.pause());
    } else if (allowAudio === false) {
      allowAudio = true;
    } else {
      allowAudio = false;
      audios.forEach((a) => a.pause());
    }
  };

  $: audios = [alarmAudio, noiseAudio, mileyAudio, taylorAudio, beyonceAudio]; // add audio objects

  $: if (allowAudio === true) {
    switch (index) {
      case 1:
        playAudio(alarmAudio);
        break;
      case 2:
        playAudio(noiseAudio);
        break;
      case 3:
        playAudio(taylorAudio);
        break;
      case 4:
        playAudio(mileyAudio);
        break;
      case 5:
        playAudio(beyonceAudio);
        break;
      default:
        audios.forEach((a) => a.pause());
    }
  }

  const playAudio = (audio) => {
    let notPlaying = audios.filter((a) => audio !== a);
    notPlaying.forEach((a) => a.pause());
    audio.currentTime = 0;

    if (audio !== alarmAudio || audio !== noiseAudio) {
      audio.volume = 0.1;
    }
    audio.play();
  };

  const filterGender = (g) => {
    highlightedGender = g;
  };
  const unfilterGender = () => {
    highlightedGender = null;
  };

  const filterMood = (m) => {
    highlightedMood = m;
  };
  const unfilterMood = () => {
    highlightedMood = null;
  };
</script>

{#if alertWindow === true}
  <div class="alert-audio">
    <p>This experience is better with audio.</p>
    <button on:click={enableAudio}>Click to enable audio</button>
  </div>
{:else if alertWindow === false}
  <div class="audio-button">
    <button on:click={audioToggle}>
      <img src={audioIcon} />
    </button>
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
      <Visual
        {index}
        {allowAudio}
        {scrollIntoView}
        {highlightedGender}
        {highlightedMood}
      />
    </div>

    <div slot="foreground" class={"foreground-" + index}>
      <section id="section-1">
        <audio
          src="src/assets/audio/alarm.mp3"
          id="alarm-mp3"
          bind:this={alarmAudio}
        >
          Your browser does not support the HTML5 Audio element.
        </audio>
      </section>
      <section id="section-2">
        <audio src="src/assets/audio/noise.mp3" bind:this={noiseAudio} />
      </section>
      <section id="section-3" bind:this={section3}>
        <p class="scrolly-text">
          No matter how much I've tried, I could never be a morning person. Most
          days I wake up greeted by <strong>SO MUCH NOISE</strong>, which clouds
          my day and prevent me from seeing the sun.
        </p>
      </section>
      <section id="section-4">
        <p class="scrolly-text">
          But <strong>listening to music 🎵</strong> helps. Most days, it can
          help to make some of the clouds go away.
          <audio
            src="https://p.scdn.co/mp3-preview/57b5f697db04a6f463de366927093882cfd5a00b"
            id="taylor-mp3"
            bind:this={taylorAudio}
          >
            Your browser does not support the HTML5 Audio element.
          </audio>
        </p>
      </section>
      <section id="section-5">
        <p class="scrolly-text">
          And it definitely has made the last 60 days <strong
            >a little less crappy</strong
          >.
        </p>
        <audio
          src="https://p.scdn.co/mp3-preview/9fbe346e805ed219204f53324f94557ab557b6d3"
          id="miley-mp3"
          bind:this={mileyAudio}
        >
          Your browser does not support the HTML5 Audio element.
        </audio>
      </section>

      <section class="headline" id="section-6">
        <h1>
          <strong>STARTING ON A HIGH NOTE🎵:</strong><br />60 days of morning
          soundtracks
        </h1>
        <p>By Stephanie Adeline</p>
        <audio
          src="https://p.scdn.co/mp3-preview/b33aaf728bc4a9357d00b4460ba81fde8a1407b2"
          id="beyonce-mp3"
          bind:this={beyonceAudio}
        >
          Your browser does not support the HTML5 Audio element.
        </audio>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <p>
            The from Jan 26 through March 26, I tracked how crappy I felt in the
            morning on <strong>a scale of 0 to 4 clouds</strong>. Four clouds
            mean I had absolutely no motivation to wake up that morning, and
            zero clouds mean I was super pumped about the day.
          </p>
          <p>
            Some days are better than others, but <strong
              >most days felt like there were at least 2 clouds</strong
            >.
          </p>
          <div class="key-container-1">
            <div
              class="key"
              on:mouseenter={() => filterMood(5)}
              on:mouseleave={() => unfilterMood()}
            >
              <img
                src="src/assets/0-clouds.svg"
                class="icon"
                class:nohighlight={highlightedMood !== null &&
                  highlightedMood !== 5}
              />
              <p>0</p>
            </div>
            <div
              class="key"
              on:mouseenter={() => filterMood(4)}
              on:mouseleave={() => unfilterMood()}
            >
              <img
                src="src/assets/1-clouds.svg"
                class="icon"
                class:nohighlight={highlightedMood !== null &&
                  highlightedMood !== 4}
              />
              <p>1</p>
            </div>
            <div
              class="key"
              on:mouseenter={() => filterMood(3)}
              on:mouseleave={() => unfilterMood()}
            >
              <img
                src="src/assets/2-clouds.svg"
                class="icon"
                class:nohighlight={highlightedMood !== null &&
                  highlightedMood !== 3}
              />
              <p>2</p>
            </div>
            <div
              class="key"
              on:mouseenter={() => filterMood(2)}
              on:mouseleave={() => unfilterMood()}
            >
              <img
                src="src/assets/3-clouds.svg"
                class="icon"
                class:nohighlight={highlightedMood !== null &&
                  highlightedMood !== 2}
              />
              <p>3</p>
            </div>
            <div
              class="key"
              on:mouseenter={() => filterMood(1)}
              on:mouseleave={() => unfilterMood()}
            >
              <img
                src="src/assets/4-clouds.svg"
                class="icon"
                class:nohighlight={highlightedMood !== null &&
                  highlightedMood !== 1}
              />
              <p>4</p>
            </div>
          </div>
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <h3>Listening to music helped to cast some of the clouds away.</h3>
          <p>
            On many days, music even had the power to boost my mood and get rid
            of all 4 clouds.
          </p>
          <p>
            You can <strong>hover over the suns</strong> to hear the song I
            listened to that day.
            <em
              ><strong>P.S.:</strong> I know I am basic, but this is a judgment-free
              zone 😂</em
            >
          </p>
          <p class="note">
            Note: On three days, I didn't listen to any songs at all.
          </p>
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <p>
            One artist in particular stood out the most. Can you guess which
            one?
          </p>
          <button on:click={() => (answer = "Miley Cyrus")}>Miley Cyrus</button>
          <button on:click={() => (answer = "Taylor Swift")}
            >Taylor Swift</button
          >
          <button on:click={() => (answer = "NIKI")}>NIKI</button>
          {#if answer}
            <p>
              You guessed <strong>{answer}</strong>. Scroll to see if you got
              that right!
            </p>
          {/if}
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <h3>It was Taylor! ❤️</h3>

          <p>
            On 7 of the 60 days, Taylor helped me get through my mornings. (And
            yes, I am still stuck in the "Fearless" and "Speak Now" era.)
          </p>

          <p>
            But Miley and NIKI were SO close! Miley had 6 songs, and NIKI had 5.
          </p>
        </div>
      </section>
      <section class="side">
        <div class="scrolly-text">
          <h3>On repeat!</h3>

          <p>
            Six songs were played on <strong>more than one mornings</strong>!
            The song that was played the most was...
          </p>

          <p>
            <strong>Flowers by Miley Cyrus</strong>! For a total of 3 times
            during the first 2 weeks. You can tell I really loved it when it
            first came out 🤣
          </p>
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <h3>Female singers 👩🏻 ‍🎤</h3>
          <p>
            Here's another little pleasant surprise. I found that most of the
            songs I felt like listening too in the morning were sung by female
            vocalists!
          </p>
          <div class="key-container-2">
            <div
              class="key"
              on:mouseenter={() => filterGender("Female")}
              on:mouseleave={() => unfilterGender()}
            >
              <img
                src="src/assets/female.svg"
                class="icon"
                class:nohighlight={highlightedGender !== null &&
                  highlightedGender !== "Female"}
              />
              <p>Female</p>
            </div>
            <div
              class="key"
              on:mouseenter={() => filterGender("Male")}
              on:mouseleave={() => unfilterGender()}
            >
              <img
                src="src/assets/male.svg"
                class="icon"
                class:nohighlight={highlightedGender !== null &&
                  highlightedGender !== "Male"}
              />
              <p>Male</p>
            </div>
            <div
              class="key"
              on:mouseenter={() => filterGender("Both")}
              on:mouseleave={() => unfilterGender()}
            >
              <img
                src="src/assets/both.svg"
                class="icon"
                class:nohighlight={highlightedGender !== null &&
                  highlightedGender !== "Both"}
              />
              <p>Both</p>
            </div>
          </div>
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <h3>Singing along also makes the clouds go away! 😊</h3>
          <p>It's on those days when I sang along did I feel my best.</p>
          <p>
            I'm quite self-conscious about my early-morning singing voice,
            because who sounds good singing so early in the morning??? But, for
            your ears only, hover over the suns to listen to get a glimpse of my
            mornings 🌅🎵
          </p>
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <h3>Genre: Mostly pop songs, but there are some exceptions...</h3>
          <p>
            I noticed that my early morning music consumption is mainly pop
            songs, but usually, closer to Sundays, I'd listen to some <strong
              >Worship music🙏</strong
            >.
          </p>
        </div>
      </section>

      <section class="side">
        <div class="scrolly-text">
          <p>
            And... In case you can't tell, I'm a big <strong
              >musical theatre</strong
            >
            fan, and although it doesn't show much here, there were some days that
            I felt like listening to some <strong>showtunes🎭</strong>.
          </p>
        </div>
      </section>
      <section class="side">
        <div class="scrolly-text">
          <p>
            I notice my music taste changes frequently, and these 60 days may
            not fully reflect all kinds of songs I listen to, or feel like
            listening to in the morning. But this was a fun little experiment to
            ask myself, what do I feel like listening today? And just play it,
            sing it. (I knew y'all won't judge! 😆)
          </p>
        </div>
      </section>
    </div>
  </Scroller>

  <div class="about">
    <h2>Why suns ☀️, clouds ☁️ and noise 🔊?</h2>
    <p>
      <strong>I love the light and I hate darkness</strong>. My mood, focus and
      motivation can be easily impacted by weather and how much natural light
      I'm getting. Waking up to a rain or a dark sky is an absolute nightmare
      for me. But at the same time, I am not a morning person, and I have the
      utmost respect for those who wake up before the sun rises.
    </p>
    <p>
      <strong>I also hate noise</strong>. I find it difficult to focus on
      anything or get in a good mood when I'm in a loud environment. And because
      I can't wake up early enough, I always wake up greeted by too much noise,
      from my dogs barking at random people on the street, to neighbors doing
      construction, to my family members talking on the phone (we're a loud
      family), and it makes me really anxious 😰.
    </p>
    <p>
      I thought long and hard about making a viz for this project that really
      tells y'all about me, and I honestly can't think of a better metaphor to
      visualize this!
    </p>
    <h2>What did I learn from this experience?</h2>
    <p>
      The last 2 months have been <strong>SO HARD</strong>. My classmates can
      probably relate, juggling full-time work and a master's degree is an
      extreme sport. And it has really been such a struggle just to get myself
      up in the morning, what with the lack of sleep and the amount of work
      greeting me as soon as I wake up.
    </p>
    <p>
      I've always found it super hard to wake up in the morning, but these past
      few months have been 1000% more challenging than ever. So I thought I have
      to make some changes. And I know, I should work on having a more proper
      morning routine like eating breakfast and maybe exercising, but I decided
      to start small. <strong>I just needed to start my day with music.</strong>
    </p>
    <p>
      Upon some googling, I did find some articles that shares the benefits of
      adding music to your daily routine. But I figured, why not take it a step
      further?
    </p>
    <p>
      I challenged myself to try to sing in the morning, if I feel like it. For
      as long as I can remember, <strong>singing is my stress relief</strong>.
      In college, away from home for the first time, singing became a coping
      mechanism, and I started posting my singing videos on
      <a href="https://www.instagram.com/stephadeline.sings/">Instagram</a>.
    </p>
    <p>
      But I'd always put too much pressure on myself to be perfect in my singing
      videos that I post on social media, that I really just wanted a way to
      sing to my heart's content without having any added pressure. This project
      has encourage me to just sing, even if you sound horrible, even if you've
      got that early morning raspy voice.
    </p>

    <p>
      Anyways, I'll expose myself and post the full playlist for these songs on
      Spotify ;)
    </p>
    <iframe
      style="border-radius:12px"
      src="https://open.spotify.com/embed/playlist/5mTOXm6TMknpxipK4tH0sY?utm_source=generator"
      width="100%"
      height="352"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
    <div class="footer">
      <p>
        This project is Stephanie's final project for the creative module in the <a
          href="http://www.mastervisualtoolsudg.com/"
          >Master's in Visual Tools to Empower Citizens program</a
        > from the University of Girona and the Visualization for Transparency Foundation.
      </p>
      <p>
        All song previews are from <a
          href="https://developer.spotify.com/documentation/web-api/reference/get-several-tracks"
          >Spotify</a
        >.
      </p>
      <p>
        For the code, please visit this <a
          href="https://github.com/stephadeline/60-days-songs">GitHub repo</a
        >. You can reach out to Stephanie via
        <a href="https://www.linkedin.com/in/stephanie-adeline-310333123/"
          >LinkedIn</a
        >
        or <a href="https://twitter.com/stephadeline">Twitter</a>.
      </p>
      <img src="src/assets/pups.jpg" class="inline-image" />
      <p>
        Thanks for making it all the way to the end of the page! Here's a photo
        of my dogs Mochi & Sapi – my real sources of sunshine (and sometimes
        clouds) – as a gift to brighten your day🤍☀️.
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  div.alert-audio {
    color: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1000;
    max-width: 400px;
    font-size: 12px;
    button {
      padding: 5px 10px;
    }
  }

  div.audio-button {
    position: fixed;
    top: 0;
    right: 0;
    margin: 10px;
    @media screen and (max-width: 500px) {
      margin: 5px;
    }
    button {
      background: none;
      pointer-events: all;
      border: none;

      &:focus {
        border: none;
        outline: none;
      }
      &:hover {
        opacity: 0.7;
      }

      img {
        width: 40px;
        height: 40px;
        @media screen and (max-width: 500px) {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .alert-audio a {
    text-decoration: underline dotted;
    color: white;
  }
  .demo {
    width: 100%;
  }

  [slot="background"] {
    font-size: 1.4em;
    overflow: hidden;
    padding: 1em;
    pointer-events: all !important;
  }

  section {
    height: 100vh;
    padding: 1em;
    margin: 0 auto;
    max-width: 400px;
    p,
    button {
      pointer-events: all;
    }
    .scrolly-text {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 5px;
      color: black;
      text-align: left;
      padding: 10px;
      max-width: 400px;
      display: inline-block;
      box-sizing: border-box;
      button {
        border: #648da6 1px solid;
        &:hover,
        &:active {
          border: rgb(255, 203, 3) 1px solid;
        }
      }
    }

    @media screen and (min-width: 700px) {
      &.side {
        margin: 0 auto 0 20px;

        .scrolly-text {
          background: none;
          color: white;
        }
      }
    }
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
    pointer-events: none;
  }
  .demo {
    pointer-events: none;
  }

  .alarm-button {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 200px;
    border-radius: 50px;
    background: orange;
    color: white;
  }

  .inline-image {
    margin: 10px auto;
    border-radius: 5px;
    width: 200px;
  }

  .key-container-2 {
    max-width: 200px;
    width: 100%;
    .key {
      pointer-events: all;
      cursor: pointer;
      float: left;
      width: 33.33%;
      p {
        text-align: center;
        margin: 0;
        font-weight: bold;
        font-size: 12px;
      }
      img {
        margin: 0 7px;
        width: 50px;
        height: 50px;
        &.nohighlight {
          opacity: 0.2;
        }
      }
    }
  }

  .key-container-1 {
    max-width: 400px;
    width: 100%;
    .key {
      cursor: pointer;
      pointer-events: all;
      float: left;
      width: 20%;
      p {
        text-align: center;
        margin: 0;
        font-weight: bold;
      }
      img {
        margin: 0 15px;
        width: 50px;
        height: 35px;
        &.nohighlight {
          opacity: 0.2;
        }
      }
    }

    @media screen and (max-width: 500px) {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  .slider {
    max-width: 400px;
    pointer-events: all;
  }

  .about {
    color: white;
    max-width: 600px;
    margin: 200px auto 0;
    padding: 16px;
    text-align: left;
    pointer-events: all;

    .footer {
      margin-top: 50px;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
    }

    a {
      color: white;
      text-decoration: underline;
    }
  }

  .note {
    font-size: 12px;
    line-height: 15px;
  }

  .headline {
    max-width: 500px;
    color: white;
  }

  h2 {
    padding-top: 30px;
  }
</style>

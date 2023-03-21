<script>
  export let dimension = 100;
  // export let height = 100;
  let scale = dimension/100;
  export let gender = "None";
  export let index;
  export let rotating = true;
  import { fade, fly } from "svelte/transition";

</script>

{#if index > 11}
<g class:rotating="{index > 12 && rotating === true}">
{#if gender === "Female"}
<g id="triangles" transform={"scale(" + scale + ")"} in:fade >
  <polygon points="50.0237 .2865 44.3043 15.0021 55.7431 15.0021 50.0237 .2865" fill="#ffcb04" />
  <polygon points="85.1684 14.8473 70.7167 21.2039 78.8025 29.2949 85.1684 14.8473" fill="#ffcb04" />
  <polygon points="99.7121 49.9991 85.0002 44.2702 84.9928 55.7089 99.7121 49.9991" fill="#ffcb04" />
  <polygon points="85.1285 85.1344 78.7813 70.6785 70.685 78.7591 85.1285 85.1344" fill="#ffcb04" />
  <polygon points="49.9673 99.6553 55.7057 84.9471 44.267 84.9323 49.9673 99.6553" fill="#ffcb04" />
  <polygon points="14.8415 85.049 29.3014 78.7111 21.2261 70.6096 14.8415 85.049" fill="#ffcb04" />
  <polygon points=".3434 49.8783 15.0478 55.6263 15.07 44.1876 .3434 49.8783" fill="#ffcb04" />
  <polygon points="14.9724 14.762 21.3009 29.226 29.4076 21.156 14.9724 14.762" fill="#ffcb04" />
</g>
{:else if gender === "Male"}
<g id="rectangles" transform={"scale(" + scale + ")"} in:fade>
  <rect x="44.4593" width="11.2774" height="14.9137" fill="#ffcb04" />
  <rect x="74.4203" y="12.4214" width="11.2774" height="14.9137"
    transform="translate(37.3159 -50.674) rotate(44.8468)" fill="#ffcb04" />
  <rect x="86.9028" y="42.357" width="11.2774" height="14.9137"
    transform="translate(141.8596 -42.9928) rotate(89.6935)" fill="#ffcb04" />
  <rect x="74.6418" y="72.384" width="11.2774" height="14.9137"
    transform="translate(193.4973 78.6215) rotate(134.5403)" fill="#ffcb04" />
  <rect x="44.7734" y="85.0264" width="11.2774" height="14.9137"
    transform="translate(101.8108 184.4219) rotate(179.387)" fill="#ffcb04" />
  <rect x="14.6813" y="72.9263" width="11.2774" height="14.9137"
    transform="translate(-21.195 152.1525) rotate(-135.7662)" fill="#ffcb04" />
  <rect x="1.8792" y="43.1259" width="11.2774" height="14.9137"
    transform="translate(-42.9377 58.9114) rotate(-90.9194)" fill="#ffcb04" />
  <rect x="13.8183" y="12.9695" width="11.2774" height="14.9137"
    transform="translate(-8.7527 20.269) rotate(-46.0727)" fill="#ffcb04" />
</g>
{:else if gender === "Both"}
<g id="combined" transform={"scale(" + scale + ")"} in:fade>
  <polygon points="50.0237 .2865 44.3043 15.0021 55.7431 15.0021 50.0237 .2865" fill="#ffcb04" />
  <polygon points="99.7121 49.9991 85.0002 44.2702 84.9928 55.7089 99.7121 49.9991" fill="#ffcb04" />
  <polygon points="49.9673 99.6553 55.7057 84.9471 44.267 84.9323 49.9673 99.6553" fill="#ffcb04" />
  <polygon points=".3434 49.8783 15.0478 55.6263 15.07 44.1876 .3434 49.8783" fill="#ffcb04" />
  <rect x="74.4203" y="12.4214" width="11.2774" height="14.9137"
    transform="translate(37.3159 -50.674) rotate(44.8468)" fill="#ffcb04" />
  <rect x="74.6418" y="72.384" width="11.2774" height="14.9137"
    transform="translate(193.4973 78.6215) rotate(134.5403)" fill="#ffcb04" />
  <rect x="14.6813" y="72.9263" width="11.2774" height="14.9137"
    transform="translate(-21.195 152.1525) rotate(-135.7662)" fill="#ffcb04" />
  <rect x="13.8183" y="12.9695" width="11.2774" height="14.9137"
    transform="translate(-8.7527 20.269) rotate(-46.0727)" fill="#ffcb04" />
</g>
{/if}
</g>

{/if}

<style>
  .rotating {
    animation-name: spin;
    animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
    
  }

  @keyframes spin {
    from {
        transform:rotate(0deg);
        transform-origin: center;
    }
    to {
        transform:rotate(360deg);
        transform-origin: center;
    }
}
#triangles, #rectangles, #combined {
  opacity: 50%;
}
</style>
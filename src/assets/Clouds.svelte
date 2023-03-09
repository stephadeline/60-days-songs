<script>

  import key from "./../data/key.json";
  import { fade, fly, blur } from "svelte/transition";


  // placements
  export let width = 100;
  export let height = 100;
  let dimension = width > height ? height : width;
  let scale = dimension/100;

  let cloudPath = "m48.5123,16.7974c-1.1848-7.1296-8.5427-7.432-10.4709-6.073-.3647-12.1741-16.6397-14.1228-19.4265-5.1316-5.697-3.3094-13.6511,2.2176-10.0543,8.1229-3.9413-.7737-8.5606,1.6983-8.5606,6.0584,0,3.4355.9522,7.0928,7.5878,7.0928h34.7309c7.1139,0,6.5404-7.9844,6.1936-10.0695Z"
  export let nClouds = Array(4);
  function arrangeClouds(index) {
    let transform;
    let x;
    let y;
    switch(index) {
    case 0:
      x = 5;
      y = 35;
      break;
    case 1:
      x = 50;
      y = 20;
      break;
    case 2:
      x = 0;
      y = 65;      
     break;
    case 3:
      x = 50;
      y = 55;
     break;
    default:
      x = 0;
      y = 0;  
  }
   return (x/100 * dimension) + "," + (y/100 * dimension)
  }

  // data part
  export let before = 2
  export let after = 4
  export let index = 0

  // let cloudProps = { fill: "#f1f1f2", stroke: "none"}

  // let fill="#f1f1f2";
  // let stroke="none";

  $:  afterUse = index === 7 ? before : after;

  $: currentCondition = key.filter(d => d.before === before && d.after === afterUse)


  // function that fills based on index
  $: getCloudClass = function(index) {

    if(currentCondition.length > 0) {
    return currentCondition[0][index];
    }
}

</script>

{#each nClouds as c, index} 
<g transition:fade class={getCloudClass(index + 1)} transform={"translate(" + arrangeClouds(index) + ")"}><path d={cloudPath} transform={"scale(" + scale + ")"}/>
</g>
{/each}


<style>
  .invisible path {
    opacity: 0;
  }
  .outline path {
    fill: none;
    stroke: #f1f1f2;
    opacity: 1;
  }
  .solid path {
    fill: #f1f1f2;
    stroke: none;
    opacity: 0.8;
  }

</style>
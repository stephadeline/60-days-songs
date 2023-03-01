<script>
  import * as d3 from 'd3';
  

  import { onMount, createEventDispatcher } from 'svelte'
  export let rootFolder = "src/assets"
  export let platform = 'sunshine-icons-final'
  let svgElem = null
  let originalAspectRatio = 1
  let component = null
  const dispatch = createEventDispatcher()
  const fetchXML = () => {
    return fetch(`${rootFolder}/${platform}.svg`)
      .then((res) => res.text())
      .then((xml) => {
        const timestamp = Date.now()
        let xmlNode = new DOMParser().parseFromString(xml, 'image/svg+xml')
        svgElem = component.appendChild(processSvg(xmlNode))
        svgElem.setAttribute('data-getsvg', timestamp)
        dispatch('load', svgElem)
        onPageResize()
        window.addEventListener('resize', onPageResize)
      })
      .catch((err) => console.log(err))
  }
  const processSvg = (xml) => {
    let svgNode = document.importNode(xml.documentElement, true)
    let [, , originalWidth, originalHeight] = svgNode.getAttribute('viewBox').split(' ')
    originalAspectRatio = originalHeight / originalWidth
    // Array.from(svgNode.querySelectorAll('image')).forEach((img) =>
    //   img.setAttribute('href', `assets/svg/${rootFolder}/${img.getAttribute('xlink:href')}`)
    // )
    return svgNode
  }
  const onPageResize = () => {
    var newWidth = component.clientWidth
    var newHeight = newWidth * originalAspectRatio
    svgElem.style.width = newWidth + 'px'
    svgElem.style.height = newHeight + 'px'
  }
  onMount(() => {
    fetchXML()
    d3.select("g#cloud-2")
      .selectAll("path")
      .attr('fill', 'red')

    return () => {
      window.removeEventListener('resize', onPageResize)
    }
  })

  // $: d3.select("g#cloud-2")
  //     .selectAll("path")
  //     .attr('fill', 'red')


</script>

<div bind:this={component} class="svg" />

<style lang="scss">
  .svg {
    margin: 0 auto;
    max-width: 125px;
  }

    #cloud-2 {
      fill: red;
      stroke: 1px red;
    }
  
</style>

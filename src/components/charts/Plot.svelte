<script>
    import AxisY from './AxisY.svelte'
	import {scaleLinear, scaleBand} from 'd3-scale';
	import {max} from 'd3-array'
    
    export let data;
	export let margin = {top: 20, right: 5, bottom: 20, left: 60};
	export let keyX;
	export let keyY;

    console.log(data);

	let width;
    let height = 500;
		
	$: x = scaleBand()
		.domain(data.map(d => d[keyX]))
		.range([margin.left, width - margin.right])
        .padding(0.1);
	
	$: y = scaleLinear()
		.domain([0, max(data, d => d[keyY])])
		.range([height - margin.bottom, margin.top]);

</script>
<div class="graphic" bind:clientWidth={width} bind:clientHeight={height}>
    {#if width}
    <svg xmlns:svg='https://www.w3.org/2000/svg' 
        viewBox='0 0 {width} {height}'
        {width}
        {height}
        >
        {#each data as d}
            <rect 
                height={y(0) - y(d[keyY]) }
                width={x.bandwidth()}
                y={y(d[keyY])}
                x={x(d[keyX])}
                fill='purple'
                stroke='none'
            />
            <text 
                y={height - margin.bottom + 5}
                x={x(d[keyX])+x.bandwidth()/2}
                font-size='0.75rem'
                text-anchor='middle'
                alignment-baseline='hanging'>
                {d[keyX]}
            </text>
        {/each}

        
        <AxisY scale={y} {width} {margin}/>        
    </svg>
    {/if}
</div>
<style>
</style>
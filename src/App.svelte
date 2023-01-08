<script>
  import LineChartInteractive from "./LineChartInteractive.svelte";
  import ScatterPlot from "./ScatterPlot.svelte";
  import BarChart from "./BarChart.svelte";
  import SmallMultipleLine from "./SmallMultipleLine.svelte";
  import SmallMultipleLineMeat from "./SmallMultipleLineMeat.svelte";
</script>

<main>
  <h1>
    <span>Argentina leads world in football ⚽🏆…</span><br />and meat-eating
    🥩🍗
  </h1>
  <p class="byline">
    By Guifré Jordan, Marina Rovira Boix and Stephanie Adeline
  </p>

  <!-- <h4 style="font-weight: bold;">About the project</h4> -->
  <p>
    In order to solve the climate crisis, many experts have said that the world
    needs to transition to a less meat-based diet and more plant-based diet. But
    there are lots of factors that influence how much meat a nation consumes.
  </p>

  <p>
    Consumption of meat across the globe over the past three decades have
    increased for some countries, but decreased for some others, and it may have
    to do with the wealth and inequality of that country. We look into the
    relationship between meat consumption, wealth and inequality. You can also
    explore our interactive charts to see trends in consumption in general or
    other goods, such as electricity and even electric vehicles.
  </p>

  <p>
    For this work official data from the OECD, as well as a dataset from the
    Climate Action Tracker independent scientific analysis, is used. The
    project also uses the Penn World Table, maintained by the University of
    California and the University of Groningen, and the World Inequality
    Database (WID), maintained by the World Inequality Lab, located in Paris.
  </p>

  <SmallMultipleLineMeat />

  <p>
    These small multiple line charts show how much of each type of meat several
    countries across the globe eat, and the results are significant.
  </p>

  <SmallMultipleLine />

  <h3>Meat consumption is falling in Europe and spiking in Asia</h3>

  <p>
    Veggie trends may have been gaining ground for several years, especially in
    Europe and Oceania, where meat is no longer as popular as in the 1990s. In
    Asia and the Americas, these way of life may not have picked up speed yet,
    as meat has been going up (in some cases, even skyrocketed) in the past
    three decades, with India and the Arab peninsula among the exceptions.
  </p>

  <p>
    This bar chart displays the percentage change in meat consumption (in
    general) for each selected country between 1991 and 2018.
  </p>
  <BarChart />

  <h4>
    Your turn to explore! How much of an impact do wealth and inequality have on
    consumption of meat and other consumption indicators?
  </h4>

  <p>
    These two interactive visualizations are two different ways to get users
    explore by themselves the impact of wealth (through GDP and GDP per capita),
    productivity and inequality on general consumption, agricultural goods,
    electric vehicles and electricity.
  </p>

  <p>
    The very basic results anyone will find include the fact that the wealthier
    a country is, the more it consumes, but this is not necessarily happening
    with meat consumption. One of the reasons is that while some countries have
    seen an increase in this indicator, others that used to be on top have a
    downward trend now.
  </p>

  <ScatterPlot />


  <p>
    Other interesting general correlations can be spotted, between electricity
    or electric vehicle consumption and GDP per capita, or between productivity
    or inequality and general consumption.
  </p>

  <p>
    Yet, if users play a bit more around these two graphs will find out the huge
    gap in consumption per person between the two biggest economies in the
    world, which country is miles away from the rest in buying electric vehicles
    or which two very northern and not very warm countries are in the global
    lead in electricity consumption.
  </p>

  <LineChartInteractive />
</main>

<style>
  p,
  h1,
  h4,
  h3 {
    text-align: left;
    margin: 10px auto 10px auto;
    max-width: 700px;
  }

  @media screen and (max-width: 700px) {
    p {
      max-width: 100vw;
      margin: 10px auto 10px auto;
    }
  }
  h1 span {
    font-size: 35px;
  }

  p.byline {
    padding-bottom: 30px;
  }
</style>

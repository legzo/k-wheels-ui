<script lang="ts">
  import { onMount } from "svelte";
  import type { Activity } from "./models/activity.js";
  import type { Analysis } from "./models/analysis.js";
  import { activities, activitiesNames } from "./store.js";
  import chroma from "chroma-js";

  let analysis: Analysis | null = null;
  let loading = false;
  let colorScale = chroma.scale("OrRd");

  let metersToKm = (meters: number) => {
    return (
      new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
        meters / 1000
      ) + " kms"
    );
  };

  let percentileToBackgroundColor = (percentile: number) => {
    return colorScale(percentile);
  };

  let percentileToForegroundColor = (percentile: number) => {
    return percentile > 0.5 ? "white" : "black";
  };

  let selectActivity = (activity: Activity) => {
    loading = true;
    analysis = null;
    fetch("https://k-wheels.herokuapp.com/analysis/activities/" + activity.id)
      .then((response) => response.json())
      .then((analysisFromApi: Analysis) => {
        analysis = analysisFromApi;
        loading = false;
      })
      .catch((error) => {
        console.log(error);
        loading = false;
        return [];
      });
  };

  onMount(async () => {
    loading = true;
    fetch("https://k-wheels.herokuapp.com/db/activities")
      .then((response) => response.json())
      .then((activitiesFromApi: Activity[]) => {
        activities.set(activitiesFromApi);
        loading = false;
      })
      .catch((error) => {
        console.log(error);
        loading = false;
        return [];
      });
  });
</script>

<header>
  <h1>K-wheels 🚴!</h1>
</header>
<main>
  {#if loading}
    🌀 Loading...
  {/if}

  {#if analysis != null}
    <div><b>Selected activity :</b> {analysis.name}</div>
    <div>
      <ul>
        {#each analysis.efforts as effort}
          <li style="list-style: none">
            <div
              style="
			  color: {percentileToForegroundColor(effort.percentile)}; 
			  background-color: {percentileToBackgroundColor(effort.percentile)};
			  display: inline-block; 
			  width: 50px; 
			  padding: 10px; 
			  text-align:center; 
			  font-family:monospace
			  "
            >
              [{effort.percentile}]
            </div>
            <b>{effort.name}</b>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <div><b>Last activities :</b></div>
  <ul>
    {#each $activities as activity}
      <li style="margin-bottom: 10px">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" on:click={() => selectActivity(activity)}>
          {#if analysis?.id == activity.id} → {/if}<b>{activity.name}</b>
          [{metersToKm(activity.distance)}]
          <br />
          <span style="font-size:80%"
            >{activity.start_date_local.replaceAll("T", " @ ")}</span
          >
        </a>
      </li>
    {/each}
  </ul>
</main>

<style>
  header {
    text-align: center;
  }
  main {
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: 70%;
    }
  }
</style>

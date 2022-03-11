<script lang="ts">
  import { onMount } from "svelte";
  import type { Activity } from "./models/activity.js";
  import AnalysisReport from "./AnalysisReport.svelte";
  import ActivityDetails from "./ActivityDetails.svelte";
  import { loading, activities, currentAnalysis } from "./store.js";

  onMount(async () => {
    loading.set(true);
    fetch("https://k-wheels.herokuapp.com/db/activities")
      .then((response) => response.json())
      .then((activitiesFromApi: Activity[]) => {
        activities.set(activitiesFromApi);
        loading.set(false)
      })
      .catch((error) => {
        console.log(error);
        loading.set(false)
        return [];
      });
  });
</script>

<header>
  <h1>K-wheels 🚴!</h1>
</header>
<main>
  {#if $loading}
    🌀 Loading...
  {/if}

  {#if $currentAnalysis != null}
    <AnalysisReport analysis={$currentAnalysis} />
  {/if}
  <div><b>Last activities :</b></div>
  <ul>
    {#each $activities as activity}
      <ActivityDetails {activity} />
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
    font-size: 2.5em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: 70%;
    }
  }
</style>

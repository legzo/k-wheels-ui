<script lang="ts">
  import {onMount} from "svelte";
  import type {Activity} from "./models/activity.js";
  import ActivityDetails from "./ActivityDetails.svelte";
  import {activities, loading} from "./store.js";
  import {currentAnalysisDetails} from "./store";
  import AnalysisGraphs from "./AnalysisGraphs.svelte";

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
  <h1>{#if $loading}<span id="loader">🌀</span>{:else}🚴{/if} K-wheels !</h1>
</header>
<main>

  {#if $currentAnalysisDetails != null}
    <AnalysisGraphs analysis={$currentAnalysisDetails} />
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

  #loader {
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-timing-function: linear;
    display: inline-block;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: 70%;
    }
  }
</style>

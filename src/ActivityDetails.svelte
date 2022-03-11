<script lang="ts">
  import type { Activity } from "./models/activity.js";
  import type { Analysis } from "./models/analysis.js";

  import { loading, currentAnalysis } from "./store.js";

  export let activity: Activity;

  let metersToKm = (meters: number) => {
    return (
      new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
        meters / 1000
      ) + " kms"
    );
  };


  let selectActivity = (activity: Activity) => {
    loading.set(true)
    currentAnalysis.set(null);
    fetch("https://k-wheels.herokuapp.com/analysis/activities/" + activity.id)
      .then((response) => response.json())
      .then((analysisFromApi: Analysis) => {
        currentAnalysis.set(analysisFromApi);
        loading.set(false)
      })
      .catch((error) => {
        console.log(error);
        loading.set(false)
      });
  };
</script>

<li>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" on:click={() => selectActivity(activity)}>
    {#if $currentAnalysis?.id == activity.id} → {/if}<b>{activity.name}</b>
    [{metersToKm(activity.distance)}]
    <br />
    <span>{activity.start_date_local.replaceAll("T", " @ ")}</span
    >
  </a>
</li>

<style>
  li {
    margin-bottom: 10px
  }
  span {
    font-size:80%
  }
</style>

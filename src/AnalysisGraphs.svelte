<script lang="ts">
  import type {DetailedAnalysis} from "./models/analysis";
  import AnalysisGraph from "./AnalysisGraph.svelte";

  export let analysis: DetailedAnalysis;
</script>

<div><b>Selected activity :</b> {analysis.name}</div>

<div id="segments">
  {#each analysis.segments as segmentData}
    <AnalysisGraph {segmentData}/>
  {/each}
</div>
<style>
#segments {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: aliceblue;
  border-radius: 10px;
  padding: 10px;
}

</style>

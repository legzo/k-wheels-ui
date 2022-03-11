<script lang="ts">
  import type { Analysis } from "./models/analysis.js";
  import chroma from "chroma-js";

  export let analysis: Analysis;
  let colorScale = chroma.scale("OrRd");

  let percentileToBackgroundColor = (percentile: number) => {
    return colorScale(percentile);
  };

  let percentileToForegroundColor = (percentile: number) => {
    return percentile > 0.5 ? "white" : "black";
  };
</script>

<div><b>Selected activity :</b> {analysis.name}</div>
<div>
  <ul>
    {#each analysis.efforts as effort}
      <li style="list-style: none">
        <div class="percentile"
          style="
                color: {percentileToForegroundColor(effort.percentile)}; 
                background-color: {percentileToBackgroundColor( effort.percentile
          )};
               "
        >
          [{effort.percentile}]
        </div>
        <b>{effort.name}</b>
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    padding-left: 10px;
  }
  .percentile {
    display: inline-block;
    width: 50px;
    padding: 10px;
    text-align: center;
    font-family: monospace;
  }
</style>

<script lang="ts">
  import type {Segment} from "./models/analysis";

  import {max, min, scaleLinear} from "d3";

  export let segmentData: Segment

  export let height = 30;

  $: xScale =
          scaleLinear()
                  .domain([min(segmentData.pastTimes), max(segmentData.pastTimes)])
                  .range([10, 190])
                  .nice()
</script>

<div class="segment">
  <span class="name">{segmentData.name}</span>

  <svg width="{200}" {height}>
    <g transform={"translate(0,14)"}>
      {#each segmentData.pastTimes as pastTime}
        <circle
                cx={xScale(pastTime)}
                cy={0}
                r="10"
                class="other"
        />
      {/each}
      <circle
              cx={xScale(segmentData.time)}
              cy={0}
              r="5"
              class="current"
      />
    </g>
  </svg>
</div>
<style>
  .segment {
    display: flex;
    height: 30px;
    align-items: center;
  }

  .current {
    fill: #ff4e4e00;
    stroke: #b42f2f;
    stroke-width: 2
  }

  .other {
    fill: #ff4e4e;
    opacity: .005
  }

  .name {
    display: inline-block;
    width: 200px;
    height: 22px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
    margin-right: 5px;
    font-size: 0.8em;
  }
</style>

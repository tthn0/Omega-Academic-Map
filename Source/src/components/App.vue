<template>
  <ONavbar />
  <DegreeMap
    :dataFetcher="new FakeDataFetcher()"
    :minYears="4"
    :minCellsPerSemester="5"
  />
</template>

<script setup lang="ts">
import "../styles/fonts.css";
import "../styles/reset.css";
import { FakeDataFetcher } from "../utils/FakeDataFetcher";
import DegreeMap from "./DegreeMap.vue";

// import "./styles.fonts.css";
// import "./styles.reset.css";
// import { OmegaDataFetcher } from "./utils.OmegaDataFetcher.ts";
// import DegreeMap from "./components.DegreeMap.vue";
</script>

<style>
:root {
  font-family: "Open Sans", sans-serif;
}
</style>

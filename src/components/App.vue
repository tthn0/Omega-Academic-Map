<template>
  <ONavbar />
  <DegreeMap :degreeId="degreeId" />
</template>

<script setup lang="ts">
import DegreeMap from "./DegreeMap.vue";

const degreeId = "10004";
</script>

<style module src="./App.css"></style>

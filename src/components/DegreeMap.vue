<template>
  <div :class="$style.page">
    <main :class="$style.container">
      <section :class="$style.degreeInfo">
        <h1 :class="$style.degreeCollege">{{ degree?.College }}</h1>
        <h2 :class="$style.degreeName">{{ degree?.Name }}</h2>
        <h3 :class="$style.degreeAcademicYears">
          Four-Year Academic Map {{ degree?.AcademicYears }}
        </h3>
      </section>
      <YearRow
        v-for="year in allYears"
        :key="year"
        :year="year"
        :maxYear="year === maxYear"
        :requirements="requirementsByYear(year)"
        :totalCreditHours="totalCreditHours"
      ></YearRow>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  useCssModule,
  watch,
} from "vue";
import type { Degree } from "../types/Degree";
import type { Requirement } from "../types/Requirement";
import { getDegree } from "../utils/getDegree";
import { getRequirements } from "../utils/getRequirements";
import { setBackground } from "../utils/setBackground";
import YearRow from "./YearRow.vue";

// import type { Degree } from "./types.Degree.ts";
// import type { Requirement } from "./types.Requirement.ts";
// import { getDegree } from "./utils.getDegree.ts";
// import { getRequirements } from "./utils.getRequirements.ts";
// import { setBackground } from "./utils.setBackground.ts";
// import YearRow from "./components.YearRow.vue";

const $style = useCssModule();

import { version } from "vue";
console.log(version);

interface Props {
  degreeId: string;
}

const props = defineProps<Props>();
const requirements = ref<Requirement[]>([]);
const degree = ref<Degree | null>(null);
const allYears = ref<number[]>([]);

const totalCreditHours = computed<number>(() => {
  return requirements.value
    .filter((r: Requirement) => r.CourseIsActive && r.SubjectIsActive)
    .reduce((hours, r: Requirement) => hours + r.CourseCreditHours, 0);
});

const maxYear = computed<number>(() => {
  return requirements.value.reduce(
    (max: number, r: Requirement) => Math.max(max, r.Year),
    4
  );
});

const fetchData = async () => {
  requirements.value = await getRequirements(props.degreeId);
  degree.value = await getDegree(props.degreeId);
};

const requirementsByYear = (year: number) => {
  return requirements.value.filter((r: Requirement) => r.Year === year);
};

watch(requirements, () => {
  const tempYears = [1, 2, 3, 4];
  for (let year = 5; year <= maxYear.value; year++) {
    tempYears.push(year);
  }
  allYears.value = tempYears;
});

onMounted(() => {
  setBackground("#808080");
  fetchData();
});

onUnmounted(() => {
  setBackground("");
});
</script>

<!-- <style module src="./DegreeMap.css"></style> -->
<style module>
.page {
  padding: 2.25rem 4.5rem;
  margin: 2rem auto;
  width: clamp(56rem, 95%, 64rem);
  background: white;
  box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.125);
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 75rem;
  gap: 1.5rem;
}

.degreeInfo {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: url("/Banner.jpg");
  background-size: cover;
  background-position: center;
}

.degreeCollege {
  color: white;
  letter-spacing: 0.025rem;
  font-size: 1.6rem;
  font-weight: 425;
  text-transform: uppercase;
}

.degreeName {
  color: white;
  letter-spacing: 0.025rem;
  margin-top: -0.25rem;
  font-size: 1.45rem;
  font-weight: 425;
}

.degreeAcademicYears {
  color: white;
  letter-spacing: 0.025rem;
  margin-top: -0.25rem;
  font-weight: 375;
  font-size: 1.25rem;
}

.yearRowContainer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>

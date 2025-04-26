<template>
  <div :class="block('page')">
    <main :class="block('container')">
      <section :class="block('degreeInfo')">
        <h1 :class="block('degreeCollege')">
          {{ degree?.College ?? "Degree Not Found" }}
        </h1>
        <h2 :class="block('degreeName')">
          {{ degree?.Name ?? "Degree Not Found" }}
        </h2>
        <h3 :class="block('degreeAcademicYears')">
          Four-Year Academic Map
          {{ degree?.AcademicYears }}
        </h3>
      </section>
      <YearRow
        v-for="year in yearsToShow"
        :key="year"
        :year="year"
        :isMaxYear="year === maxYear"
        :requirements="requirementsByYear(year)"
        :totalCreditHours="totalCreditHours"
        :minCellsPerSemester="minCellsPerSemester"
      ></YearRow>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { DataFetcher } from "../types/DataFetcher";
import type { Degree } from "../types/Degree";
import type { Requirement } from "../types/Requirement";
import { blockClass } from "../utils/blockClass";
import { setBackground } from "../utils/setBackground";
import YearRow from "./YearRow.vue";

// import { computed, onMounted, onUnmounted, ref, watch } from "vue";
// import type { DataFetcher } from "./types.DataFetcher.ts";
// import type { Degree } from "./types.Degree.ts";
// import type { Requirement } from "./types.Requirement.ts";
// import { blockClass } from "./utils.blockClass.ts";
// import { setBackground } from "./utils.setBackground.ts";
// import YearRow from "./components.YearRow.vue";

const props = defineProps<{
  dataFetcher: DataFetcher;
  minYears: number;
  minCellsPerSemester: number;
}>();

const block = blockClass("DegreeMap");
const degreeId: number | null = props.dataFetcher.getDegreeId();
const requirements = ref<Requirement[]>([]);
const degree = ref<Degree | undefined>();
const yearsToShow = ref<number[]>([]);

const totalCreditHours = computed<number>(() => {
  return requirements.value
    .filter((r: Requirement) => r.CourseIsActive && r.SubjectIsActive)
    .reduce((hours, r: Requirement) => hours + r.CourseCreditHours, 0);
});

const maxYear = computed<number>(() => {
  return requirements.value.reduce(
    (max: number, r: Requirement) => Math.max(max, r.Year),
    props.minYears
  );
});

const requirementsByYear = (year: number): Requirement[] => {
  return requirements.value.filter((r: Requirement) => r.Year === year);
};

const fetchData = async () => {
  const [degreeResult, requirementsResult] = await Promise.all([
    props.dataFetcher.getDegree(degreeId),
    props.dataFetcher.getRequirements(degreeId),
  ]);
  degree.value = degreeResult;
  requirements.value = requirementsResult;
};

const updateYearsToShow = () => {
  yearsToShow.value = Array.from({ length: maxYear.value }, (_, i) => i + 1);
};

watch(requirements, updateYearsToShow);

onMounted(() => {
  setBackground("#808080");
  fetchData();
});

onUnmounted(() => {
  setBackground("");
});
</script>

<style scoped>
.DegreeMap__page {
  padding: 2.25rem 4.5rem;
  margin: 2rem auto;
  width: clamp(56rem, 95%, 64rem);
  background: white;
  box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.125);
}

.DegreeMap__container {
  display: flex;
  flex-direction: column;
  min-height: 75rem;
  gap: 1.5rem;
}

.DegreeMap__degreeInfo {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  /* background: url("/Banner.jpg"); */
  background: url("https://i.imgur.com/Z7Eif9Z.jpeg");
  background-size: cover;
  background-position: center;
}

.DegreeMap__degreeCollege {
  color: white;
  letter-spacing: 0.025rem;
  font-size: 1.6rem;
  font-weight: 425;
  text-transform: uppercase;
}

.DegreeMap__degreeName {
  color: white;
  letter-spacing: 0.025rem;
  margin-top: -0.25rem;
  font-size: 1.45rem;
  font-weight: 425;
}

.DegreeMap__degreeAcademicYears {
  color: white;
  letter-spacing: 0.025rem;
  margin-top: -0.25rem;
  font-weight: 375;
  font-size: 1.25rem;
}

.DegreeMap__yearRowContainer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>

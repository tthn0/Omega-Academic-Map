<template>
  <div :class="block('_container')">
    <div :class="block('yearContainer')">
      <p :class="block('year')">Year {{ year }}</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Fall Semester</th>
          <th>Spring Semester</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="([fallCourse, springCourse], i) in transposedRequirements"
          :key="i"
        >
          <CourseCell :requirement="fallCourse" />
          <CourseCell :requirement="springCourse" />
          <td></td>
        </tr>
        <tr :class="block('topBorder')">
          <td>
            <p>Semester Hours</p>
            <p></p>
            <p>{{ fallCreditHours }}</p>
          </td>
          <td>
            <p>Semester Hours</p>
            <p></p>
            <p>{{ springCreditHours }}</p>
          </td>
          <td>
            {{ fallCreditHours + springCreditHours }}
          </td>
        </tr>
        <tr v-if="isMaxYear" :class="block('topBorder')">
          <td></td>
          <td></td>
          <td>{{ totalCreditHours }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Requirement } from "../types/Requirement";
import { blockClass } from "../utils/blockClass";
import CourseCell from "./CourseCell.vue";

// import { ref } from "vue";
// import type { Requirement } from "./types.Requirement.ts";
// import { blockClass } from "./utils.blockClass.ts";
// import CourseCell from "./components.CourseCell.vue";

const props = defineProps<{
  year: number;
  isMaxYear: boolean;
  requirements: Requirement[];
  totalCreditHours: number;
  minCellsPerSemester: number;
}>();

const block = blockClass("YearRow");

const getSortedRequirements = (semesterName: string) =>
  props.requirements
    .filter(
      (r: Requirement) =>
        r.Year === props.year &&
        r.SemesterName === semesterName &&
        r.CourseIsActive &&
        r.SubjectIsActive
    )
    .sort((a: Requirement, b: Requirement) => a.SortOrder - b.SortOrder);

const zipLongest = (
  ...requirementsByTerm: Requirement[][]
): (Requirement | null)[][] => {
  const coursesPerTerm = requirementsByTerm.map(
    (termCourses: Requirement[]) => termCourses.length
  );
  const rowsToDisplay = Math.max(...coursesPerTerm, props.minCellsPerSemester);
  return Array.from({ length: rowsToDisplay }, (_, i) =>
    requirementsByTerm.map((termCourses: Requirement[]) =>
      i < termCourses.length ? termCourses[i] : null
    )
  );
};

const calculateSemesterHours = (courses: Requirement[]) =>
  courses.reduce(
    (acc: number, course: Requirement) => acc + course.CourseCreditHours,
    0
  );

const fallCourses = getSortedRequirements("Fall");
const springCourses = getSortedRequirements("Spring");

const fallCreditHours = ref<number>(0);
const springCreditHours = ref<number>(0);
const transposedRequirements = ref<(Requirement | null)[][]>([]);

fallCreditHours.value = calculateSemesterHours(fallCourses);
springCreditHours.value = calculateSemesterHours(springCourses);
transposedRequirements.value = zipLongest(fallCourses, springCourses);
</script>

<style scoped>
.YearRow._container {
  display: grid;
  grid-template-columns: auto 1fr;

  .YearRow.yearContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: black;
    width: 3em;
  }

  .YearRow.year {
    position: absolute;
    display: inline-block;
    white-space: nowrap;
    font-size: 1.75rem;
    font-weight: 425;
    text-transform: uppercase;
    color: white;
    transform: rotate(-90deg);
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
    table-layout: fixed;
  }

  tr {
    display: grid;
    grid-template-columns: 1fr 1fr 3rem;

    &:nth-child(even) {
      background-color: #f2f2f2;
    }
  }

  td:not(:last-child),
  th:not(:last-child) {
    border-right: 1px solid black;
  }

  td:last-child,
  th:last-child {
    text-align: right;
  }

  th:not(:last-child) {
    text-align: left;
  }

  th {
    background: #d9d9d9;
    font-weight: 500;
    font-size: 0.975rem;
    padding: 0.05rem 0.5rem;
  }

  td {
    padding: 0.025rem 0.5rem;
    font-weight: 450;
    font-size: 0.825rem;

    &:not(:last-child) {
      display: grid;
      gap: 1.4rem;
      align-items: center;
      grid-template-columns: 6.3rem 1fr auto;
    }
  }

  .YearRow.topBorder {
    border-top: 1px solid black;
  }
}
</style>

<template>
  <div :class="$style.container">
    <div :class="$style.yearContainer">
      <p :class="$style.year">Year {{ year }}</p>
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

        <tr :class="$style.topBorder">
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
        <tr v-if="maxYear" :class="$style.topBorder">
          <td></td>
          <td></td>
          <td>{{ totalCreditHours }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Requirement } from "../types/Requirement";
import CourseCell from "./CourseCell.vue";

interface Props {
  year: number;
  maxYear: boolean;
  requirements: Requirement[];
  totalCreditHours: number;
}

const props = defineProps<Props>();

const getSortedRequirementsByTerm = (semesterName: string) =>
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
  const MINIMUM_ROWS_TO_DISPLAY = 4;
  const rowsToDisplay = Math.max(...coursesPerTerm, MINIMUM_ROWS_TO_DISPLAY);
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

const fallCreditHours = ref<number>(0);
const springCreditHours = ref<number>(0);

const transposedRequirements = ref<(Requirement | null)[][]>([]);

const fallCourses = getSortedRequirementsByTerm("Fall");
const springCourses = getSortedRequirementsByTerm("Spring");

fallCreditHours.value = calculateSemesterHours(fallCourses);
springCreditHours.value = calculateSemesterHours(springCourses);

transposedRequirements.value = zipLongest(fallCourses, springCourses);
</script>

<style module src="./YearRow.css"></style>

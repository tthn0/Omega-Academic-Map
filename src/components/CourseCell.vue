<template>
  <td
    :class="{ [$style.clickable]: requirement?.CourseDescription }"
    @click="showDescription(requirement?.CourseDescription)"
  >
    <p v-if="props.requirement">
      {{ props.requirement.SubjectAbbreviation }}
      {{ props.requirement.CourseNumber }}
    </p>
    <p v-else>&nbsp;</p>
    <p :class="{ [$style.core]: props.requirement?.CourseIsCore }">
      {{ props.requirement?.CourseName }}
    </p>
    <p>{{ props.requirement?.CourseCreditHours }}</p>
  </td>
</template>

<script setup lang="ts">
import { type Requirement } from "../types/Requirement";

interface SingleCourseCellProps {
  requirement: Requirement | null;
}

const props = defineProps<SingleCourseCellProps>();

const showDescription = (description?: string) => {
  if (description) alert(description);
};
</script>

<style module src="./CourseCell.css"></style>

<template>
  <td v-if="!requirement">
    <p>&nbsp;</p>
  </td>
  <td
    v-else
    :class="requirement.CourseDescription && block('clickable')"
    @click="showDescription(requirement.CourseDescription)"
  >
    <p>
      {{ requirement.SubjectAbbreviation }}
      {{ requirement.CourseNumber }}
    </p>
    <p :class="requirement.CourseIsCore && block('core')">
      {{ requirement.CourseName }}
    </p>
    <p>{{ requirement.CourseCreditHours }}</p>
  </td>
</template>

<script setup lang="ts">
import type { Requirement } from "../types/Requirement";
import { blockClass } from "../utils/blockClass";

// import type { Requirement } from "./types.Requirement.ts";
// import { blockClass } from "./utils.blockClass.ts";

defineProps<{
  requirement: Requirement | null;
}>();

const block = blockClass("CourseCell");
const showDescription = (description?: string) => {
  description && alert(description);
};
</script>

<style scoped>
.CourseCell.clickable {
  cursor: pointer;

  p {
    transition: transform 0.3s ease;
  }

  &:hover p {
    transform: scale(1.05);
  }
}

.CourseCell.core::after {
  content: "*";
  padding-left: 0.1rem;
}
</style>

<!--
  Dropdown.vue - UI Component

  Features:
  - Dropdown selection for courses.
  - Updates the bound value when a course is selected.

  Props:
  * options: Array<string>        List of course options.
  * label: String                 Label for the select field.
  * modelValue: String            Bound value of the selected course.
  * prop: String                  // (Optional) Property name for form validation.
  * rules: Array<any> | object    // (Optional) Validation rules for the select 

  Emits:
  * update:modelValue             Event emitted when the selected course changes.
-->

<template>
  <el-form-item :label="label" :prop="prop" :rules="rules">
    <el-select
      :model-value="modelValue"
      type="dropdown"
      placeholder="Select Course"
      @update:modelValue="emitUpdate"
    >
      <el-option
        v-for="(option, index) in options || []"
        :key="index"
        :value="option"
      >
        {{ option }}
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";

// Component props
const props = defineProps<{
  options: string[];
  label: string;
  modelValue: string;
  prop?: string;
  rules?: Array<any> | object;
}>();

// Emit event: Updating value of the option
const emit = defineEmits(["update:modelValue"]);

const emitUpdate = (value: string) => {
  emit("update:modelValue", value);
};

// Watch: Changes in the value of the option
watch(
  () => props.modelValue,
  (newValue) => {
    emitUpdate(newValue);
  }
);
</script>

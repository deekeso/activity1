<!--
  DatePicker.vue - UI Component

  Features:
  - Date picker input field.
  - Updates the bound value when a date is selected.

  Props:
  * label: String                 Label for the date picker field.
  * modelValue: String            Bound value of the selected date.
  * inputProps: Object            Additional properties for the date picker element.

  Emits:
  * update:modelValue             Event emitted when the selected date changes.
-->

<template>
  <el-form-item :label="label" :prop="prop" :rules="rules" :required="false">
    <el-col>
      <el-date-picker
        :model-value="modelValue"
        type="date"
        v-bind="inputProps"
        style="width: 100%"
        @update:modelValue="emitUpdate"
      />
    </el-col>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";

// Component props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  inputProps: {
    type: Object,
    default: () => ({}),
  },
  prop: {
    type: String,
    default: "",
  },
  rules: {
    type: [Object, Array],
    default: () => [],
  },
});

// Emit event: Updating value of the selected date
const emit = defineEmits(["update:modelValue"]);

const emitUpdate = (value: string | null) => {
  emit("update:modelValue", value ? new Date(value).toISOString() : "");
};

// Watch: Changes in the value of the date
watch(
  () => props.modelValue,
  (newValue) => {
    emitUpdate(newValue);
  }
);
</script>

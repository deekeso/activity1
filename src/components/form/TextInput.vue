<!--
  TextInput.vue - Form Component

  Props:
  * label: String                Label for the input field.
  * modelValue: String|Number    Bound value of the input field.
  * type: String                 Type of the input field (default: "text").
  * inputProps: Object           Additional properties for the input element.
  * icon: String                 Icon to display in the input field.

  Emits:
  * update:modelValue            Event emitted when the input value changes.
-->

<template>
  <el-form-item :label="label" :prop="prop" :rules="rules" :required>
    <el-input
      v-bind="inputProps"
      :model-value="modelValue"
      :type="type"
      :prefix-icon="icon"
      @input="$emit('update:modelValue', $event)"
    />
  </el-form-item>
</template>

<script setup>
defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  inputProps: {
    type: Object,
    default: () => ({}),
  },
  icon: {
    type: String,
    default: "",
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

defineEmits(["update:modelValue"]);
</script>

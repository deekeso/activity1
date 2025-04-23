<!--
  Button.vue - UI Component

  Features:
  - Customizable button with optional icon.
  - Handles click events.
  - Supports different button types and styles.

  Props:
  * type: String                  Type of the button (default: "primary").
  * customClass: String           Custom CSS class for the button.
  * handleClick: Function         Function to handle button click events.
  * icon: String                  Icon to display in the button.
  * iconPosition: String          Position of the icon (left or right, default: "left").
  * iconClass: String             Custom CSS class for the icon.
-->

<template>
  <el-button
    size="small"
    :type="type"
    @click="handleClick"
    :class="customClass"
  >
    <!-- Left Icon -->
    <el-icon v-if="icon && iconPosition === 'left'" :class="iconClass">
      <component :is="icon" />
    </el-icon>
    <!-- Name -->
    <slot></slot>
    <!-- Right Icon -->
    <el-icon v-if="icon && iconPosition === 'right'" :class="iconClass">
      <component :is="icon" />
    </el-icon>
  </el-button>
</template>

<script setup>
import { defineProps } from "vue";

// Component props
const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  customClass: {
    type: String,
    default: "",
  },
  handleClick: {
    type: Function,
    default: () => {},
  },
  icon: {
    type: String,
    default: null,
  },
  iconPosition: {
    type: String,
    default: "left",
  },
  iconClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.box-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.blue-btn {
  width: 40%;
  font-size: 1rem;
  padding: 18px;
  background: #2148c0;
  color: #fff;
  border-radius: 6px;
}

.blue-btn:hover {
  color: #ffffff9a;
}
</style>

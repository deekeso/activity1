<template>
  <div class="body">
    <div class="modal">
      <h1>Logout Confirmation</h1>
      <el-text class="p">Are you sure you want to log out?</el-text>

      <div class="flex-box">
        <el-button type="primary" @click="$emit('logout')">Confirm</el-button>
        <el-button type="default" @click="$emit('closeModal')">Cancel</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.body {
  height: 100vh;
  width: 100%;
  position: absolute;
  background: hsla(0, 0%, 0%, 0.356);
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  max-width: 500px;
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 5px;

  text-align: center;
}
.p {
  color: black;
}
.flex-box {
  margin-top: 20px;
}
</style>

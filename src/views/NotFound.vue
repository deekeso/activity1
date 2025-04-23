<template class="notfound">
  <!-- Container that centers the card -->
  <div class="container">
    <el-card class="card">
      <template #header> Page Not Found </template>
      <img src="../assets/3793096.jpg" alt="Page not found image" class="img" />
    </el-card>
  </div>
</template>

<style>
.notfound body {
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
}

/* Container to center the card */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* Card with fixed size of 5in x 5in */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5in;
  height: 5in;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
}

/* Ensure image is 4x4 inches and centered */
.img {
  width: 4in;
  height: 4in;
  object-fit: cover;
}
</style>

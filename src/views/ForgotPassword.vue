<template>
  <el-container>
    <el-header>
      <h2 style="color: white; text-align: center">Forgot Password</h2>
    </el-header>

    <el-main>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="forgot-password-form"
        @keydown="preventEnterKey"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="Enter email"
            class="white-text"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit(formRef)">
            Submit
          </el-button>
        </el-form-item>

        <div v-if="showResetLink" class="reset-link">
          <p class="black-text">
            A reset link has been sent to your email. Click below to proceed:
          </p>
          <a
            href="https://ems-docs.element.io/books/element-cloud-documentation/page/reset-user-password/export/html"
            target="_blank"
            @click="handleResetLinkClick"
            >Open Email to Reset Password</a
          >
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formRef = ref<FormInstance>();
const form = reactive({
  email: "",
});

const rules = reactive<FormRules>({
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
});

const showResetLink = ref(false);

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      // Show reset link on successful validation
      showResetLink.value = true;

      // Clear the form fields after submission
      form.email = "";
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.resetFields();
  showResetLink.value = false; // Reset the reset link
};

// Handle the reset link click to redirect to the login page after opening the link
const handleResetLinkClick = () => {
  setTimeout(() => {
    // Redirect to the login page after the reset link is opened
    window.location.href = "/LoginPage";
  }, 1000); // Wait for 1 second before redirecting
};

// Prevent Enter key to submit form
const preventEnterKey = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};
</script>

<style scoped>
.white-text input {
  color: white !important;
}

.forgot-password-form {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.el-form-item {
  margin-bottom: 20px;
}

.black-text {
  color: black;
}

.reset-link {
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.reset-link a {
  color: #2148c0;
  text-decoration: none;
}

.reset-link a:hover {
  text-decoration: underline;
}
</style>

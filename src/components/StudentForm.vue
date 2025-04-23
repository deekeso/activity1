<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    class="student-form"
  >
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="form.firstName" placeholder="Enter first name" />
    </el-form-item>

    <el-form-item label="Middle Initial" prop="middleInitial">
      <el-input
        v-model="form.middleInitial"
        placeholder="Enter middle initial"
        maxlength="1"
      />
    </el-form-item>

    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="form.lastName" placeholder="Enter last name" />
    </el-form-item>

    <el-form-item label="Birth Date" prop="birthDate">
      <el-date-picker
        v-model="form.birthDate"
        type="date"
        placeholder="Select birth date"
        style="width: 100%"
        @change="calculateAge"
      />
    </el-form-item>

    <el-form-item label="Age" prop="age">
      <el-input v-model="form.age" disabled />
    </el-form-item>

    <el-form-item label="Address" prop="address">
      <el-input
        v-model="form.address"
        type="textarea"
        placeholder="Enter address"
      />
    </el-form-item>

    <el-form-item label="Course" prop="course">
      <el-select
        v-model="form.course"
        placeholder="Select course"
        style="width: 100%"
      >
        <el-option
          v-for="(courseName, courseKey) in COURSES"
          :key="courseKey"
          :label="courseName"
          :value="courseName"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="showConfirmation(formRef)">
        {{ props.student ? "Update" : "Submit" }}
      </el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>

  <el-dialog
    v-model="showConfirmDialog"
    :title="props.student ? 'Confirm Update' : 'Confirm Submission'"
    width="30%"
  >
    <div class="confirmation-content">
      <h4>Please confirm the student details:</h4>
      <p>
        <strong>Name:</strong> {{ form.firstName }}
        {{ form.middleInitial ? `${form.middleInitial}.` : "" }}
        {{ form.lastName }}
      </p>
      <p><strong>Birth Date:</strong> {{ formatDate(form.birthDate) }}</p>
      <p><strong>Age:</strong> {{ form.age }}</p>
      <p><strong>Address:</strong> {{ form.address }}</p>
      <p><strong>Course:</strong> {{ form.course }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showConfirmDialog = false">Cancel</el-button>
        <el-button type="primary" @click="confirmSubmit(formRef)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { COURSES } from "@/stores/StudentStore";
import { ElDialog } from "element-plus";

const props = defineProps({
  student: {
    type: Object,
    default: null,
  },
  showDrawer: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit"]);

const formRef = ref<FormInstance>();
const form = reactive({
  firstName: "",
  middleInitial: "",
  lastName: "",
  birthDate: "",
  age: "",
  address: "",
  course: "",
});

// Custom validation to allow spaces if there's at least one non-space character
const noSpacesValidatorWithCondition = (
  rule: any,
  value: string,
  callback: any
) => {
  if (value.trim() === "" || /\s{2,}/.test(value)) {
    callback(new Error("Invalid Input"));
  } else {
    callback();
  }
};

const validateBirthDate = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("Birth date is required"));
  } else {
    const birthDate = new Date(value);
    const birthYear = birthDate.getFullYear();

    if (birthYear > 2007) {
      callback(new Error("Students born after 2007 cannot be registered"));
    } else {
      callback();
    }
  }
};

const rules = reactive<FormRules>({
  firstName: [
    { required: true, message: "First name is required", trigger: "blur" },
    { validator: noSpacesValidatorWithCondition, trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "Last name is required", trigger: "blur" },
    { validator: noSpacesValidatorWithCondition, trigger: "blur" },
  ],
  middleInitial: [
    { required: false, message: "Please input middle name", trigger: "blur" },
    {
      validator: (_rule, value, callback) => {
        if (value && !value.trim()) {
          callback(new Error("Input cannot be empty or spaces only"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  birthDate: [{ validator: validateBirthDate, trigger: "change" }],
  address: [
    { required: true, message: "Address is required", trigger: "blur" },
    { validator: noSpacesValidatorWithCondition, trigger: "blur" },
  ],
  course: [
    { required: true, message: "Course is required", trigger: "change" },
  ],
});

const calculateAge = () => {
  if (form.birthDate) {
    const birthDate = new Date(form.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    form.age = age.toString();
  } else {
    form.age = "";
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  Object.assign(form, {
    firstName: "",
    middleInitial: "",
    lastName: "",
    birthDate: "",
    age: "",
    address: "",
    course: "",
  });
};

const showConfirmDialog = ref(false);

const formatDate = (date: string) => {
  return date ? new Date(date).toLocaleDateString() : "";
};

const showConfirmation = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      showConfirmDialog.value = true;
    }
  });
};

const confirmSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  emit("submit", { ...form });
  showConfirmDialog.value = false;

  if (!props.student) {
    resetForm(formEl);
  }
};

// Add a new method to handle dialog close
const handleDialogClose = () => {
  showConfirmDialog.value = false;
};

// Modify the existing watch to also trigger when showDrawer changes
watch(
  [() => props.student, () => props.showDrawer],
  ([newStudent, isDrawerOpen]) => {
    if (newStudent) {
      // Populate form with student data
      Object.assign(form, {
        firstName: newStudent.firstName,
        middleInitial: newStudent.middleInitial,
        lastName: newStudent.lastName,
        birthDate: newStudent.birthDate,
        age: newStudent.age,
        address: newStudent.address,
        course: newStudent.course,
      });
    } else if (!isDrawerOpen) {
      // Reset form when drawer is closed and no student is selected
      resetForm(formRef.value);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.student) {
    Object.assign(form, props.student);
  } else {
    resetForm(formRef.value);
  }
});
</script>

<style scoped>
.student-form {
  padding: 20px;
}

:deep(.el-form-item__label) {
  color: #606266;
}

.confirmation-content {
  margin: 20px 0;
  word-break: break-word;
}

.confirmation-content h4 {
  margin-top: 0;
  font-size: 18px;
}

.confirmation-content p {
  margin: 10px 0;
  line-height: 1.5;
}

.confirmation-content strong {
  color: #2148c0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.dialog-footer .el-button {
  flex: 1;
  margin: 0; /* Remove default margins */
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 95% !important;
    margin: 10px auto !important;
  }

  :deep(.el-dialog__body) {
    padding: 15px !important;
  }

  :deep(.el-dialog__footer) {
    padding: 10px 15px 15px !important;
  }

  .confirmation-content h4 {
    font-size: 16px;
  }

  .confirmation-content p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  :deep(.el-dialog__header) {
    padding: 15px !important;
  }

  :deep(.el-dialog__title) {
    font-size: 16px !important;
  }

  .dialog-footer {
    flex-direction: column-reverse; /* Stack buttons with confirm on top */
    gap: 8px;
  }

  .dialog-footer .el-button {
    width: 100%;
    margin: 0;
  }

  .confirmation-content {
    margin: 15px 0;
  }
}
</style>

// Import necessary Vue utilities and the student store
import { computed, type Ref } from "vue";
import { useStudentStore } from "../store/studentStore";

// Define a composable function to filter students based on a given filter value
export const useFilteredStudents = (filter: Ref<string>) => {
  const studentStore = useStudentStore(); // Access the Student store

  // Computed property to filter students based on the filter criteria
  const filteredStudents = computed(() => {
    if (filter.value === "all") {
      return studentStore.students; // Return all students if the filter is set to "all"
    }
    return studentStore.students.filter(
      (student) => student.course.toLowerCase() === filter.value.toLowerCase()
    );
  });

  // Return the computed property to allow other components to use the filtered students
  return { filteredStudents };
};

// Import required Vue utilities
import { ref, watch, type Ref } from "vue"; // Provides reactivity, watch functionality, and type definitions

// Define a function named 'useAgeCalculator' that calculates age based on a given birthdate reference
export function useAgeCalculator(birthDateRef: Ref<string | Date | null>) {
  // Create a ref to store the computed age
  const ageRef = ref<number | string>("");

  // Watch for changes in the birthdate reference
  watch(
    () => birthDateRef.value, // Observes the 'birthDateRef' for changes
    (newBirthDate) => {
      // Check if the birthdate is provided
      if (newBirthDate) {
        const birthDate = new Date(newBirthDate); // Parse the input into a Date object
        const today = new Date(); // Get the current date
        const age =
          today.getFullYear() -
          birthDate.getFullYear() - // Calculate difference in years
          (today.getMonth() < birthDate.getMonth() || // Adjust if the current month is before the birth month
          (today.getMonth() === birthDate.getMonth() && // Adjust if the current day is before the birth day
            today.getDate() < birthDate.getDate())
            ? 1 // Deduct 1 year if the full birthdate hasn't occurred yet this year
            : 0);
        ageRef.value = age; // Update the reactive age reference with the calculated age
      } else {
        // If no birthdate is selected, clear the age value
        ageRef.value = ""; // Reset the age reference to an empty string
      }
    }
  );

  // Return the reactive age reference for use in other components
  return {
    ageRef,
  };
}

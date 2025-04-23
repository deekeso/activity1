/**
 * Logic for formatting student information.
 *
 * @param {Student} props - The student object containing information to be formatted.
 * @returns {object} - Computed properties: fullName, formattedBirthdate, age.
 */

import { computed } from "vue";
import { Student } from "@/interface/Students";

export function useInfoFormatter(props: Student) {
  // ---- Splitting middle initial ----
  const middleInitial = computed(() => props.middleName.charAt(0) + ".");

  //    Combining full name
  const fullName = computed(
    () => `${props.firstName} ${middleInitial.value} ${props.lastName}`
  );

  // ---- Format birthdate to MM/DD/YYYY ----
  const date = new Date(props.birthdate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedBirthdate: string = date.toLocaleDateString(
    undefined,
    options
  );

  // ---- Calculate age based on birthday ----
  const calculateAge = (birthdate: string) => {
    const birthDate = new Date(props.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  const age = computed(() => calculateAge(props.birthdate));

  return {
    fullName,
    formattedBirthdate,
    age,
  };
}

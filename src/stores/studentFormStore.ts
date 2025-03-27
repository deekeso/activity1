import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const studentFormStore = defineStore("formStore", () => {
  // FormStatus

  const firstName = ref("");
  const middleName = ref("");
  const lastName = ref("");
  const birthDate = ref("");
  const age = ref(0);
  const address = ref("");

  const stringifyStudentInfo = () => {
    return (
      `First Name: ${firstName.value}\n` +
      `Middle Name: ${middleName.value}\n` +
      `Last Name: ${lastName.value}\n` +
      `Birth Date: ${birthDate.value}\n` +
      `Age: ${age.value}\n` +
      `Address: ${address.value}`
    );
  };

  // Loading data from localStorage

  const loadStoredData = () => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      firstName.value = parsedData.firstName || "";
      middleName.value = parsedData.middleName || "";
      lastName.value = parsedData.lastName || "";
      birthDate.value = parsedData.birthDate || "";
      age.value = parsedData.age || 0;
      address.value = parsedData.address || "";
    }
  };

  watch(birthDate, (newBirthDate) => {
    if (newBirthDate) {
      const birth = new Date(newBirthDate);
      const today = new Date();
      let computedAge = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        computedAge--;
      }
      age.value = computedAge;
    } else {
      age.value = 0;
    }
  });

  // Saving data to localStorage

  const saveToLocalStorage = () => {
    const localData = localStorage.getItem("formData");
    if (!localData) return;

    const updatedData = [
      ...JSON.parse(localData),
      JSON.stringify({
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        birthDate: birthDate.value,
        age: age.value,
        address: address.value,
      }),
    ];
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  return {
    firstName,
    middleName,
    lastName,
    birthDate,
    age,
    address,
    saveToLocalStorage,
    loadStoredData,
    stringifyStudentInfo,
  };
});

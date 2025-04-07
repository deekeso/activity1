export const saveDefaultUser = () => {
  const defaultUser = {
    id: "admin-id",
    firstName: "default",
    middleName: "user",
    lastName: "admin",
    birthDate: "",
    age: 0,
    address: "adminAddress",
    course: "",
    username: "admin",
    email: "admin1@sample.com",
    password: "admin123",
    isAdmin: true,
  };

  const storedData = JSON.parse(localStorage.getItem("students") || "[]");

  const adminExists = storedData.some(
    (user: { id: string }) => user.id === "admin-id"
  );

  if (!adminExists) {
    storedData.push(defaultUser);
    localStorage.setItem("students", JSON.stringify(storedData));
  }
};

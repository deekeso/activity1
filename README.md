# Student Registration

A simple student registration website that utilizes Vue3, Composition API, Typescript and Pinia as State Management.

## Installation

```bash
npm install
npm install pinia-plugin-persistedstate
npm run dev
```

## Components

1. LogIn.vue
   -This is where the Login is locayed
2. SignUp.vue - This is where the Signup is located
3. DisplayStudentInforation.vue- This is where the main page is located
4. Drawer.vue - This is where the Add student is located
5. OpenProfileDrawer.vue - This is where the Edit Profile is located
6. MyProfileDialog.vue - This is where the My Profile Viewer is located

## Views

App.vue

- This is where we render the website

## Stores

studentInfo.ts

- This where the CRUD functionalities reside and the state management PINIA functionalities

## router

index.ts

- This is where the router reside, meaning where paths, name and linking of the components

## Features

- Sign in with validations
- Log in with validations
- Add user functionality
- Update user functionality
- Delete user functionality
- localstorage for keeping of Data

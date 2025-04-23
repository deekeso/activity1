# Act 1 - Student Registration with Login

This project implements a student registration form using **Vue 3** and **Element Plus** UI framework. The goal is to create an interactive form where students can register by entering their personal details, which can then be stored or processed as needed.

## Requirements

- Use Data(Variables)
- Apply Data Binding
- Add Confirmation Modal using Conditionals
- Apply Iterations to Data
- Display Student list in Cards to apply v-for
- Responsive
- Functions (Validation and Submit)
- Responsive to all screens
- Themed Registration according to Login Page
- Apply Computed
- Apply Watch Properties
- Use Components for creating and updating student records using drawer
- Define props in each components
- Apply Page Routing
- Apply Component Communication using Emit

## Features

- Responsive and user-friendly student registration form
- Form validation using Element Plus components
- Input fields for student's name, age, gender, email, and course selection
- Error handling and form validation feedback

## Prerequisites

- **Node.js** (>= 14.x.x)
- **Vue 3**
- **Element Plus** UI framework

## Installation

### Step 1: Clone the repository

```bash
git clone git@codehub.devcloud.ap-southeast-3.huaweicloud.com:e3a5eff9967f4076a0b3829dd3e807ad/ldd-devs/frontend/student-registration.git
```

### Step 2: Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Step 3: Run the project

After installing the dependencies, run the development server:

```bash
npm run dev
```

## Project Structure

```php
student-registration/
├── public/                # Public assets
├── src/                   # Source code
│   ├── assets/            # Static assets like images, etc.
│   ├── components/        # Reusable components
│   ├── views/             # View components for different pages
│   ├── App.vue            # Root Vue component
│   └── main.ts            # Entry point of the Vue app
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Key Components

1. **RegisterForm.vue** <br/>The main form component where the student enters their details. It uses several Element Plus components to create input fields, validation rules, and buttons.

2. **App.vue** <br/>
   The root component that integrates and renders the UserLogin.vue component.

## Form Validation

The form uses Element Plus's built-in validation system to ensure that all fields are correctly filled out before submission:

- **Name:** Required and must be a valid string.
- **Age:** Must be a positive integer.
- **Course:** Must be selected from a list.

## Sample Data

When the form is successfully submitted, the data can be processed, stored, or logged. Here's an example of the data that might be collected:

```json
{
  "name": "John Doe",
  "age": 22,
  "birthday": "December 25, 1999",
  "course": "Computer Science"
}
```

## Technologies Used

- **Vue 3:** Frontend JavaScript framework
- **Element Plus:** UI library for Vue 3

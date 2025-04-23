# Student Registration System

## 📝 Overview

The Student Registration System is a comprehensive Vue.js application designed to manage student records efficiently, featuring a modern, responsive interface with advanced functionality for student management.

## 🌟 Key Features

### System Architecture

- Single Page Application (SPA) using Vue 3
- State Management with Pinia
- Responsive Design
- Local Storage Persistence
- Form Validation
- Dynamic Student Management

### Technical Highlights

- Vue 3 Composition API
- TypeScript Integration
- Element Plus UI Components
- Reactive State Management
- Client-side Routing
- Advanced Form Handling

## 🚀 Prerequisites

- Node.js (v16+)
- npm or Yarn
- Vue 3
- Pinia
- Element Plus

## 📦 Project Structure

```
student-registration-system/
│
├── src/
│   ├── components/
│   │   ├── StudentCard.vue        # Individual student card component
│   │   ├── StudentModalForm.vue   # Student registration/edit form
│   │   └── BackgroundSvgs.vue     # Background SVG component
│   │
│   ├── stores/
│   │   ├── authentication.ts       # Authentication store
│   │   └── student.ts              # Student data management store
│   │
│   ├── types/
│   │   └── CommonModels.ts         # TypeScript interfaces
│   │
│   ├── views/
│   │   └── StudentRegistrationView.vue  # Main registration page
│   │
│   └── App.vue
└── README.md
```

## 🔧 Core Components

### 1. Student Card (`StudentCard.vue`)

- Displays individual student information
- Provides edit and delete actions
- Responsive card design

### 2. Student Modal Form (`StudentModalForm.vue`)

- Dynamic form for adding/editing students
- Comprehensive validation
- Age calculation
- Confirmation dialogs

### 3. Student Registration View (`StudentRegistrationView.vue`)

- Centralized student management interface
- Search and filter capabilities
- Pagination
- Responsive layout

## 🧩 State Management (Pinia)

### Student Store (`student.ts`)

- Manages student data lifecycle
- Local storage integration
- CRUD operations
  - `loadStudents()`
  - `addStudent()`
  - `updateStudent()`
  - `deleteStudent()`

### Student Store (`authentication.ts`)

- Account form input valiation
- Local storage integration for persitent protected routing
- Login and Logout

## 📋 Data Model

```typescript
// GLobal student type model
export type Student = {
  id: string
  firstName: string
  middleName: string
  lastName: string
  birthDate: string | Date
  age: number
  address: string
  course: string
}
// Global SearchQuery type model
export interface StudentFilter {
  searchQuery: string
  course: string
  minAge?: number
  maxAge?: number
}

// GLobal UserModel type model
export type UserModel = {
  username: string
  password: string
}
```

## 📝 Form Validation Rules

- First Name: Required, 2-50 characters
- Middle Name: Optional, 1-20 characters
- Last Name: Required, 2-50 characters
- Birth Date: Must be 18+ years old
- Address: Required, 5-100 characters
- Course: Required, selected from predefined list

## 🔍 Search and Filter

- Full-text search across student fields
- Course-based filtering
- Pagination support (8 students per page)

## 📱 Responsive Design

- Adaptive layout for mobile and desktop
- Responsive grid for student cards
- Dynamic drawer and modal sizing

## 🔐 Authentication System

### Overview

The authentication system is a crucial component of the Student Registration System, providing secure access control and user management.

### Authentication Architecture

- Store-based authentication using Pinia
- Local storage for session management
- Form validation
- Dummy user authentication (for demonstration)

### Key Components

#### 1. Authentication Store (`authentication.ts`)

##### Features

- Reactive form state management
- Validation rules
- Login/Logout handling
- Local storage interaction

##### Authentication Flow

```typescript
// Authentication Strategy
const handleSubmit = async (e: Event) => {
  // 1. Form Validation
  // 2. Credential Check
  // 3. Login Success/Failure Handling
}
```

#### 2. Authentication Methods

##### Login Process

1. Validate Form Inputs

   - Username: Required, minimum 3 characters
   - Password: Required, minimum 6 characters

2. Credential Verification

   - Dummy User Credentials:
     ```typescript
     const dummyUser = {
       username: 'admin',
       password: 'admin123',
     }
     ```

3. Success Scenario

   - Set `isLoggedIn` in localStorage
   - Store User Data
   - Redirect to Registration Page

4. Failure Scenario
   - Display Error Message
   - Prevent Access

##### Logout Process

- Remove Login Status
- Clear User Data
- Redirect to Login Page

### Security Considerations

⚠️ **Note**: This is a demonstration authentication system.
For production:

- Implement server-side authentication
- Use secure password hashing
- Implement proper token-based authentication
- Add multi-factor authentication
- Implement proper error handling

### Local Storage Management

```typescript
// Login Storage
localStorage.setItem('isLoggedIn', 'true')
localStorage.setItem('userData', JSON.stringify(userCredentials))

// Logout Cleanup
localStorage.removeItem('isLoggedIn')
localStorage.removeItem('userData')
```

### Form Validation Rules

```typescript
const rules = {
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
}
```

## 🔒 Credential Management

### Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change default credentials in production!

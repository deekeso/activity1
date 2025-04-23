# Student Registration

## Overview

A simple Student Registration website to manage students information.

## Project Structure

```
src/
│
├── assets/           # Static assets like images, styles
│   └── styles/       # CSS or styling-related files
│
├── components/       # Reusable Vue components
│   └── form/         # Form-related components
│   └── layout/       # Layout components
│   └── ui/           # Shared UI components
│
├── composables/      # Vue composition API utilities
│   ├── auth/         # Authentication-related composables
│   ├── crud/         # Create, Read, Update, Delete utilities
│   ├── data/         # Data manipulation helpers
│   └── format/       # Data formatting utilities
│
├── views/            # Page-level components
│   └── forms/        # Form view components
│       ├── StudentInfoForm.vue   # Main student registration form
│       ├── LoginView.vue         # Login page
│       └── RegisterView.vue      # Registration page
│
└── App.vue           # Main application component
```

## Key Dependencies

- **Pinia**: State management with persistent state support
- **Vue Router**: Seamless SPA navigation
- **Element Plus Icons**: Comprehensive icon library
- **TypeScript**: Adds type safety to the project
- **Vite**: Fast build tool and development server

## Installation

To get started, run the following commands:

```json
# Clone the project
git checkout interns/bmariscotes

# Install dependencies
npm install

# Run development server
npm run dev
```

## Usage

- Credentials are stored in `public/users/data`
- Default login credentials available for testing

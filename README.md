# 🐾 SAMI Vet – Veterinary Patient Management System

## 📌 Overview

SAMI Vet is a real-world veterinary clinic management application designed to manage owners, pets, and medical visits in an organized and scalable way.

This project is being developed as a production-oriented application intended to be used by an actual veterinary clinic. It focuses on clean architecture, maintainability, and real-world usability.

The goal is not just to build a demo app, but to simulate a professional-grade system that reflects real business requirements.

---

## 🚀 Tech Stack

- **React** – Frontend library
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Supabase** – Backend as a Service (database + API)

---

## 🏗️ Architecture

The project follows a feature-based folder structure to keep scalability and maintainability in mind.

```plaintext
src/
├── features/
│   ├── owners/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── pets/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── visits/
│       ├── components/
│       ├── hooks/
│       └── services/
├── helpers/
├── pages/
├── routes/
└── types/
```

Each feature encapsulates:

- Components
- Business logic
- Context management
- Hooks
- Types

This structure allows the project to grow without becoming difficult to maintain.

---

## 🗂️ Core Features

### 👤 Owner Management

- Create, edit, and manage pet owners
- Store contact information
- Associate multiple pets to a single owner

### 🐶 Pet Management

- Register pets with detailed information
- Link pets to owners
- Maintain complete medical history per pet

### 🩺 Visit Management

- Record veterinary visits
- View full visit history per pet
- Track diagnoses and treatments
- Manage vaccination records
- Schedule future appointments

### 📅 Appointment & Vaccination Tracking

- Maintain a structured history of administered vaccines
- Plan and track future visits
- Ensure complete medical traceability

---

## 🗄️ Database Design

Supabase is used as the backend service and handles:

- Owners table
- Pets table
- Visits table

The relationships are structured to ensure:

- One-to-many (Owner → Pets)
- One-to-many (Pet → Visits)
- Historical consistency and data integrity

---

## 🌍 Internationalization

The application supports multi-language functionality, making it adaptable to real clinic environments.

---

## 🎯 Project Goals

This project demonstrates:

- Real-world frontend architecture
- Scalable project structure
- Type-safe development with TypeScript
- Clean UI with Tailwind CSS
- Proper state management and separation of concerns
- Integration with a backend service (Supabase)
- Practical business logic implementation

It is intentionally built to reflect production-like standards rather than tutorial-level complexity.

---

## 📈 Why This Project Matters

SAMI Vet is not a simple CRUD demo. It simulates:

- Real data relationships
- Medical history management
- Long-term scalability considerations
- Professional code organization

It showcases my ability to:

- Design structured frontend architecture
- Work with relational databases
- Implement maintainable React patterns
- Build real-world business applications

---

## 🔮 Future Improvements

- Authentication & role-based access
- Billing & accounts receivable module
- Dashboard with analytics
- Performance optimizations
- Automated reminders system

---

## 👨‍💻 Author

Developed by **Eduardo Lulo**  
Front-End Developer focused on building scalable and real-world applications.

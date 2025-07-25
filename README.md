# 🧑‍💻 React Dashboard & Profile App

This is a frontend-only React application that features:

- 🔐 **Login screen** using dummy users API
- 📋 **Dashboard** with a paginated, searchable, and sortable comment list
- 👤 **Profile page** displaying detailed user info
- 📦 **LocalStorage persistence** for session and filters
- 🔁 **Routing** between login, dashboard, and profile using `react-router-dom`

---

## 🔗 Live Demo

👉 [Deployed Link (https://swiftassignmentdashboard.netlify.app/login)]

---

## 📸 Screenshots

### ✅ Login Page  
User enters username from API to log in.

### ✅ Dashboard  
- Shows 500 comments (from API)
- Custom Pagination: 10 / 50 / 100 items per page
- Search by name, email, phone
- Sorting by Post ID, Name, Email (ascending / descending / none)
- State is persisted on refresh using localStorage

### ✅ Profile  
- Loads user details using the logged-in username
- Initials avatar and full name shown
- Includes address, phone, email, and user ID
- Nice background and responsive layout

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/react-dashboard-profile.git
cd react-dashboard-profile
#   D a s h b o a r d S w i f t 
 
 
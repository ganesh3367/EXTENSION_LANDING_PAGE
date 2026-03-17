# 🚀 Extension Landing Page

A premium, high-performance landing page designed for showcasing VS Code extensions and developer tools. Built with a focus on visual excellence, smooth animations, and a seamless user experience.

![Preview](https://raw.githubusercontent.com/ganesh3367/EXTENSION_LANDING_PAGE/main/public/preview-mockup.png) <!-- Note: Add a real preview image path if available -->

## ✨ Key Features

- **🎭 Live Transformation**: Interactive visual components demonstrating the power of extension integration.
- **💻 VS Code Integration**: Seamlessly integrated UI elements that mirror the developer environment.
- **🌪 GSAP Animations**: High-end scroll-triggered animations and horizontal parallax effects for a "wow" factor.
- **🔒 Firebase Auth**: Secure authentication flow with Google Sign-In and protected user profiles.
- **📂 Personal Dashboard**: A dedicated "My Extensions" area for users to manage their installed browser and IDE tools.
- **📱 Ultra-Responsive**: Fully optimized for all device sizes, from mobile to ultra-wide displays.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation**: [GSAP (GreenSock)](https://greensock.com/gsap/) with ScrollTrigger
- **Backend/Auth**: [Firebase](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Navigation**: [React Router 7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Custom Glassmorphism & Modern UI Tokens)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ganesh3367/EXTENSION_LANDING_PAGE.git
   cd EXTENSION_LANDING_PAGE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a Web App and copy your configuration.
   - Create a `.env` file (or update `src/firebase.js`) with your credentials.

4. **Run development server**
   ```bash
   npm run dev
   ```

## 📦 Project Structure

- `src/components/`: Modular UI components (Hero, Navbar, Features, Profile, etc.).
- `src/hooks/`: Custom React hooks for logic reuse.
- `src/firebase.js`: Firebase initialization and Authentication configuration.
- `src/index.css`: Global design tokens and foundational styles.

## 📄 License

This project is for demonstration and portfolio purposes.

---
Built with ❤️ for the Developer Community.

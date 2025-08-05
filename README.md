<div align="center">
  <br />  
  <a href="https://landing.eduva.tech/">
    <img src="public/images/logo.png" alt="EDUVA Logo" width="200"/>
  </a>
  <br/>
  <strong>EDUVA - A comprehensive educational platform for schools, teachers, and students</strong>
</div>

## 📋 Table of Contents

- [About Project](#about-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## About Project

EDUVA is a modern, comprehensive educational management platform designed to streamline the learning experience for schools, teachers, and students. Built with Angular 18 and modern web technologies, it provides a robust, scalable solution for educational institutions.

### Key Features:

- **Free Trial Access**: School administrators can try the platform with limited features
- **Account Registration**: Easy sign-up process for full platform access
- **Support Contact**: Direct communication with system administrators for assistance
- **Interactive Demo**: Video demonstrations showcasing platform capabilities
- **Feature Overview**: Clear explanation of EDUVA's benefits and target audience
- **FAQ Section**: Common questions and concerns addressed
- **Responsive Design**: Optimized for all devices and screen sizes

## 🛠 Built With

### Frontend Framework

- **[Angular 18](https://angular.io/)** - Modern web application framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### UI/UX Libraries

- **[PrimeNG](https://primeng.org/)** - Rich UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Development Tools

- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Prettier](https://prettier.io/)** - Code formatter
- **[Custom Webpack](https://github.com/angular-builders/custom-webpack)** - Custom build configuration

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Minimum 4GB RAM recommended
- Stable internet connection for backend services

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tranduckhuy/eduva-landing.git
   cd eduva-landing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit environment file with your configuration
   # Required environment variables:
   # - BASE_API_URL: Your backend API URL
   # - CLIENT_URL: Frontend application URL
   ```

4. **Start development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🎮 Usage

### For School Administrators

The landing page is designed to guide school administrators through the following journey:

- **Explore Platform**: Watch demo videos and learn about EDUVA's capabilities
- **Try Platform**: Access free trial functionality to experience features firsthand
- **Register Account**: Sign up for full access if satisfied with the trial
- **Implement in School**: Begin using EDUVA for your educational institution

### Landing Page Features

- **Hero Section**: Clear value proposition with "Try Free" and "Register Now" buttons
- **Feature Overview**: Interactive demo video and target audience explanation
- **Benefits List**: Comprehensive list of EDUVA's capabilities and advantages
- **Differentiation**: Why EDUVA is better than traditional teaching methods
- **FAQ Section**: Common questions and concerns addressed
- **Contact Form**: Support and registration information

## 🔧 Available Scripts

```bash
# Development
npm start                  # Start development server
npm start:staging          # Start with staging configuration

# Building
npm run build              # Build for production
npm run build:staging      # Build for staging
npm run build:dev          # Build for development
npm run watch              # Build with watch mode

# Testing
npm test                   # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:ui            # Run tests with UI
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/              # Core functionality (auth, interceptors)
│   ├── features/          # Feature modules
│   │   └── landing-page/  # Landing page components
│   │       ├── hero/      # Hero section
│   │       ├── feature/   # Feature showcase
│   │       ├── benefits/  # Benefits list
│   │       ├── difference/# Differentiation section
│   │       ├── faq/       # FAQ section
│   │       ├── contact/   # Contact form
│   │       └── sign-up-modal/ # Registration modal
│   └── shared/            # Shared components and services
├── assets/                # Static assets (images, fonts)
└── environments/          # Environment configurations
```

## 🔐 Environment Variables

The project uses environment configuration for different deployment stages.

### Required Variables

```bash
# API Configuration
BASE_API_URL=your_backend_api_url
CLIENT_URL=your_frontend_url
```

### Setup Instructions

1. Create `.env` file
2. Copy `.env.example` to `.env`
3. Fill in your actual values

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow Angular style guide
- Write unit tests for new features
- Ensure code passes linting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for better education</p>
  <p>© 2025 EDUVA. All rights reserved.</p>
</div>

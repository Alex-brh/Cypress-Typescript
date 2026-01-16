# Cypress TypeScript E2E Test Suite

A comprehensive end-to-end testing framework built with **Cypress** and **TypeScript** for automated testing of an e-commerce store application.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)

## 🎯 Overview

This project provides automated end-to-end testing for a store application using Cypress with TypeScript. It follows the **Page Object Model (POM)** design pattern to ensure maintainability and scalability of tests.

### Key Features

- ✅ TypeScript support for type-safe test code
- ✅ Page Object Model for better code organization
- ✅ Reusable custom Cypress commands
- ✅ Fixture-based test data management
- ✅ Comprehensive store page validation
- ✅ Product details and options testing
- ✅ Cross-browser testing capability


## 📦 Prerequisites

Before running the tests, make sure you have the following prerequisites installed:

- **Node.js**: Version 16 or higher.
- **npm**: The Node.js package manager.
- **Visual Studio Code**: (recommended) An IDE for editing the code.

## Installation

To install the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Configuration

To configure the project, you need to update the `cypress.config.ts` file. The configuration options include:

- `baseUrl`: The base URL of the application being tested.
- `viewportWidth` and `viewportHeight`: The width and height of the browser viewport.
- `chromeWebSecurity`: Whether to disable Chrome's web security for testing.

## Running Tests

To run the tests, use the following command:

```bash
npx cypress open
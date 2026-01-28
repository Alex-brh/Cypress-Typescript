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

This project provides a comprehensive automated end-to-end testing framework for a modern e-commerce store application using **Cypress** and **TypeScript**. It follows the **Page Object Model (POM)** design pattern to ensure maintainability, scalability, and ease of test maintenance.

### Project Description

This test suite is designed to validate the functionality, user experience, and reliability of an e-commerce store application. The project includes test coverage for various key features of the store, including:

- **Home Page**: Landing page functionality and navigation
- **Store/Products Page**: Product listing, filtering, and display options
- **Product Details**: Individual product pages with variant selection
- **Shopping Cart**: Cart operations and checkout flow
- **Contact Page**: Contact form submission and validation
- **FAQ Page**: Frequently asked questions page functionality
- **Customer Testimonials**: Customer reviews and feedback sections
- **Frames/Showcase**: Product showcase and featured items
- **Clearance Section**: Discount and sale item management

The test suite uses structured test data through fixtures to ensure consistent and reliable testing across different scenarios.

### Key Features

- ✅ **TypeScript Support**: Type-safe test code with full IDE support and intellisense
- ✅ **Page Object Model (POM)**: Organized page objects for better code reusability and maintenance
- ✅ **Reusable Custom Commands**: Custom Cypress commands for common interactions
- ✅ **Fixture-Based Test Data**: JSON fixture files for managing test data across multiple test cases
- ✅ **Comprehensive Coverage**: Tests for multiple pages and user workflows
- ✅ **Cross-Browser Testing**: Compatible with multiple browsers (Chrome, Firefox, Edge, Safari)
- ✅ **Real Event Simulation**: Uses `cypress-real-events` for realistic user interactions
- ✅ **Organized Test Structure**: Separated concerns with dedicated folders for tests, page objects, and fixtures


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
## Running Tests

Cypress provides multiple ways to run tests depending on your needs. Choose the method that best fits your workflow:

### 1. **Interactive Mode (Recommended for Development)**

The interactive mode opens the Cypress Test Runner, allowing you to see tests execute in real-time and debug issues:

```bash
npx cypress open
```

This command will:
- Open the Cypress Test Runner interface
- Display all available test files organized by category
- Allow you to select and run individual tests or all tests
- Show real-time test execution with the ability to inspect elements
- Display test results and error messages in the browser

### 2. **Headless Mode (Recommended for CI/CD)**

Run tests headlessly in the command line without the interactive UI. This is ideal for continuous integration pipelines:

```bash
npx cypress run
```

This will:
- Execute all tests in headless mode
- Display results in the terminal
- Exit with appropriate success/failure status codes

### 3. **Run Specific Test File**

To run tests from a specific test file only:

```bash
npx cypress run --spec "cypress/e2e/tests/home.cy.ts"
```

Replace the file path with the test file you want to run.

### 4. **Run Tests in Specific Browser**

You can specify which browser to use for running tests:

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
npx cypress run --browser safari
```

For interactive mode:

```bash
npx cypress open --browser firefox
```

### 5. **Run Tests with Specific Configuration**

Override configuration settings at runtime:

```bash
npx cypress run --config baseUrl=https://example.com,viewportWidth=1280,viewportHeight=720
```

### 6. **Run Tests with Recordings (Videos)**

Enable video recording during test execution (enabled by default in most configurations):

```bash
npx cypress run --record
```

### 7. **Debugging Tests**

To debug tests with additional logging:

```bash
npx cypress run --headed --no-exit
```

The `--headed` flag shows the browser while running, and `--no-exit` keeps the browser open after tests complete.

### Test Execution Tips

- **Before Running Tests**: Ensure the application being tested is accessible at the configured `baseUrl`
- **Test Organization**: Tests are organized by feature in the `cypress/e2e/tests/` directory
- **Page Objects**: Page object files are located in `cypress/e2e/POM/` for easy reference
- **Test Data**: Fixture data is stored in `cypress/fixtures/` and loaded within individual tests
- **Screenshots on Failure**: Failed tests automatically generate screenshots in the `cypress/screenshots/` directory
- **Videos**: If enabled, test execution videos are saved in the `cypress/videos/` directory

## 📁 Project Structure

```
cypress/
├── e2e/
│   ├── POM/                          # Page Object Model files
│   │   ├── clearance-page.ts
│   │   ├── contact-page.ts
│   │   ├── customer-testimonials-page.ts
│   │   ├── faq-page.ts
│   │   ├── frames-page.ts
│   │   ├── home-page.ts
│   │   ├── showcase-page.ts
│   │   └── store-page.ts
│   ├── tests/                        # Test specification files
│   │   ├── clearance.cy.ts
│   │   ├── contact.cy.ts
│   │   ├── customer-testimonials.cy.ts
│   │   ├── faq.cy.ts
│   │   ├── frames.cy.ts
│   │   ├── home.cy.ts
│   │   ├── showcase.cy.ts
│   │   └── store.cy.ts
├── fixtures/                         # Test data files (JSON)
│   ├── clearance-data.json
│   ├── contact-data.json
│   ├── customer-testimonials-data.json
│   ├── faq-data.json
│   ├── frames-data.json
│   ├── home-data.json
│   ├── showcase-data.json
│   └── store-data.json
├── screenshots/                      # Generated screenshots on test failures
├── support/                          # Cypress support files
│   ├── commands.ts                   # Custom Cypress commands
│   └── e2e.ts                        # Global test configuration
└── videos/                           # Generated test videos (if enabled)

cypress.config.ts                      # Cypress configuration file
package.json                           # Project dependencies and scripts
tsconfig.json                          # TypeScript configuration
README.md                              # This file
```

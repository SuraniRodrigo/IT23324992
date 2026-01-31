installation guide
# ITPM Assignment 1: Automated Testing Project
**Student Registration Number:** IT23324992
**Module:** ITPM (Year 3 Semester 2)

## Project Overview
This project automates 35 test scenarios for a Singlish-to-Sinhala transliteration web application. It uses a data-driven approach by reading test cases from a JSON file and generating separate test reports for each scenario.

## Prerequisites
Ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [VS Code](https://code.visualstudio.com/)

## Installation
1. Clone the repository or extract the project folder `IT23324992`.
2. Open the terminal inside the project directory.
3. Install the required dependencies:
   bash
   npm install



4. Install Playwright browsers:
bash
npx playwright install


## Running the Tests

# To run all functional scenarios and the UI test in headed mode:

bash
npx playwright test --headed



## To view the detailed HTML report with individual test bars:

bash
npx playwright show-report

const { test, expect } = require('@playwright/test');
const path = require('path');

// Set a global timeout of change this
test.setTimeout(120000);

// Load test data from JSON file in the structure
const testData = require(path.join(__dirname, '..', 'testData.json'));

test.describe('Data Driven Functional Test Cases', () => {

    // Create a test for each item in the JSON file
    for (const data of testData) {

        test(`${data.id}: ${data.input.substring(0, 20)}...`, async ({ page }) => {

            // Timeout for each test
            test.setTimeout(30000);

            await page.goto('https://www.swifttranslator.com/', {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            const inputBox = page.locator('textarea').first();
            const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap').first();

            // Enter input text
            await inputBox.fill(data.input);

            // Validation (only if expected output is provided)
            if (data.expected) {
                await expect(outputBox).toContainText(
                    data.expected.trim(),
                    { timeout: 50000 }
                );
            }

            // Logging results
            const actualResult = await outputBox.innerText();
            console.log(`ID       : ${data.id}`);
            console.log(`EXPECTED : ${data.expected}`);
            console.log(`ACTUAL   : ${actualResult}`);
            console.log('-------------------------');
        });
    }

    /*
    // UI Test Case (Optional – can be enabled later)
    test('Pos_UI_0001 - Verify Clear button resets the interface', async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/');

        const inputBox = page.locator('textarea').first();
        const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap').first();

        await inputBox.fill('Testing clear button');
        await expect(outputBox).not.toBeEmpty();

        const clearButton = page.getByRole('button', { name: /clear/i });
        await clearButton.click();

        await expect(inputBox).toBeEmpty();
        await expect(outputBox).toBeEmpty();
    });
    */
});

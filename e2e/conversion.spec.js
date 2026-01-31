const { test, expect } = require('@playwright/test');
const path = require('path');

// Give all tests in this file plenty of time to run, in case of slow networks or processing
test.setTimeout(120000);

// Load the test data from the JSON file
const testData = require(path.join(__dirname, '..', 'testData.json'));

test.describe('Test Case', () => {

    // Run a test for each piece of data we have
    for (const data of testData) {
        
        test(`${data.id}: ${data.input.substring(0, 20)}...`, async ({ page }) => {
            // Allow enough time for this specific test to finish
            test.setTimeout(50000); 

            await page.goto('https://www.swifttranslator.com/',{
                waitUntil: 'domcontentloaded',
                timeout: 80000
             } );

            const inputBox = page.locator('textarea').first();
            const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap').first();

            // Type the test input into the translator box
            await inputBox.fill(data.input);

            // If we have an expected result, check that the translation matches it
            if (data.expected) {
                
                await expect(outputBox).toContainText(data.expected.trim(), { timeout: 20000 });
            }
            
            const actualResult = await outputBox.innerText();
      console.log(`ID: ${data.id}`);
      console.log(`EXPECTED: ${data.expected}`);
      console.log(`ACTUAL  : ${actualResult}`);
      console.log('-------------------------');
    });
  }

    // Test the user interface by translating a long paragraph
    test('Pos_UI_0001 - Verify translation of a 30+ word paragraph', async ({ page }) => {

  await page.goto('https://www.swifttranslator.com/', {
    waitUntil: 'domcontentloaded'
  });

  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap').first();

  const longSentence =
    "Oya dannawada mama ada ude nagitala baladdi godak paraku wela hitiye eth mama ikmanata lassana kamak hadagena kala mage weda tika iwara karanna gaththa hebei thama mata kello set une na.";


  await inputBox.fill(longSentence);

  await expect(outputBox).not.toBeEmpty({ timeout: 20000 });

  await expect(outputBox).toContainText('නගිට'); 

  await expect(outputBox).toBeVisible();

  const result = await outputBox.innerText();
  console.log(`UI Translation Output:\n${result}`);
  console.log(`Character Count: ${result.length}`);
});

});
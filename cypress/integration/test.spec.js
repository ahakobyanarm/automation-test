/// <reference types="cypress" />

// The file `applitools.config.js` specifies how to run this test against multiple browsers in Applitools Ultrafast Grid.

// This "describe" method contains related test cases with per-test setup and cleanup.
describe('Automation Test', () => {

    // This method performs setup before each test.
    beforeEach(() => {

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({
            appName: 'Automation Test',                  // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
        })
    })

    // The interactions use typical Cypress calls,
    // but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
    // Traditional assertions that scrape the page for text values are not needed here.
    it('should navigate to Hello World page', () => {

        // Load the Hello World page.
        cy.visit('https://applitools.com/helloworld?diff1')

        // Verify the full page loaded correctly.
        cy.get('span.diff1.diff2.random-number').then($el => {
            cy.eyesCheckWindow({
                tag: "before click",
                target: 'window',
                fully: true,
                ignore: $el
            });
        })

        // Click on “Click me!” button.
        cy.get('button:contains("Click me!")').click();

        // Verify the full page loaded correctly.
        cy.get('span.diff1.diff2.random-number').then($el => {
            cy.eyesCheckWindow({
                tag: "before click",
                target: 'window',
                fully: true,
                ignore: $el
            });
        })
    })

    // This method performs cleanup after each test.
    afterEach(() => {

        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })
})

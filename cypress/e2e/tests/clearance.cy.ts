import * as data from '../../fixtures/clearance-data.json'
import { ClearancePage } from '../POM/clearance-page';
const clearancePage = new ClearancePage();

describe('Test "Clearance" page by validating', () => {

    beforeEach(() => {
        // Navigate to the "Clearance" page before each test.
        clearancePage.navigateToClearancePage();
    });

    it('h2 headers', () => {
        // Validate h2 headers.
        clearancePage.h2HeaderValidation(data);
    });

    it('paragraph texts', () => {
        // Validate paragraph texts.
        clearancePage.paragraphTextValidation(data);
    });

    it('buttons attributes', () => {
        // Validate buttons attributes.
        clearancePage.buttonsValidation();
    });

});

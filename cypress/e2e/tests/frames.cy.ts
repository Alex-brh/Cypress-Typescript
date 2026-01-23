import * as data from '../../fixtures/frames-data.json'
import { FramesPage } from '../POM/frames-page';
const framesPage = new FramesPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        // Navigate to the Contact page before each test.
        framesPage.navigateToElementsWithFramesPage();
    });

    it('shadow DOM - amazon link', () => {
        // Validate the page appearance.
        framesPage.validateLinksWithShadowDom(data.frameData);
    });
});
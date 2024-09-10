import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

// created a new variable with the type of the page object
let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    // await page.goto(pages.profile);
    // profilePage = new ProfilePage(page);
    profilePage = await hooks.beforeEach(page, ProfilePage, pages.profile); //hooksを使うことで上の２行をこの１行にできる
});

test.describe('Profile - Dynamic Page Object Model', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn();
    });
});

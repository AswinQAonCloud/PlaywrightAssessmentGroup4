import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { HomePage } from '../pages/home.page.js';
import { AdminPage } from '../pages/admin.page.js';
import { ENV } from '../config/env.js';
import { testData } from '../fixtures/testData.js';



test('Admin Login Test', async ({ page }) => {


    const login = new LoginPage(page);
    const home = new HomePage(page);
    const admin = new AdminPage(page);

    await page.goto('https://automationintesting.online/');


    await home.goToAdmin();


    await login.login(ENV.username, ENV.password);
    // Step 4: Validate login success
    await admin.verifyLogoutVisible();


    // Step 5: Create Room

    await admin.createRoom(testData.room);
    await admin.validateRoomNameError();
    await admin.createRoom(testData.validRoom);
    await admin.goToMessages();
    //delete the room
    await admin.deleteFirstMessage();
    // Step 1: Go to Report
    await admin.goToReport();
    // Step 3: Click calendar controls
    await admin.clickToday();
    await admin.clickBack();
    await admin.clickNext();
    //go to front page menu
    await admin.goToFrontPage();
    // book room
    await home.clickBookingMenu();
    await home.clickFirstBooking();
    //await home.clickFirstBookNow();
    await page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(2)").click();
    await home.clickreservenow();
    await home.clickreservenow();


    await home.clickreservenow();


    // validate errors for empty form for reservation
    await home.validateBookingErrors(testData.errors.bookingForm);
    //reserve with valid data
    await home.reservenow(testData.reserve);
    //go to admin and check the message is received for the booking
    await home.goToAdmin();


    await login.login(ENV.username, ENV.password);


    await admin.goToMessages();


    //confirm the booking message is received
    await messagesPage.verifyMessageExists(testData.message.name, testData.message.subject);


});

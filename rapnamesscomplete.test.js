const { expect } = require("@jest/globals");

describe("Input fields", () => {

    it("should exist", async () => {
      await page.goto("https://www.myrapname.com");
      await page.click('input[name="firstname"]');
      await page.click('input[name="lastinitial"]');
      await page.click('input[type="checkbox"]');
    });
  });

describe("Entering non-letters in the first name", () => {

    it("should prompt that you must enter your first name", async () => {
        await page.goto("https://www.myrapname.com");
        await page.fill('input[name="firstname"]', "*&^");
        await page.click('input[name="Male"]');
        await expect(page).toHaveText('body > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > h1:nth-child(5)', "You must enter your first name.");
    });
  });

describe("Entering valid inputs in the fields", () => {

    it("should create a nickname", async () => {
        await page.goto("https://www.myrapname.com");
        await page.fill('input[name="firstname"]', "Seth");
        await page.fill('input[name="lastinitial"]', "B");
        await page.click('input[name="Male"]');
        await expect(page).toHaveText('body > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > h1', " ");
    });
  });

  describe("Creating a nickname for a male with an existing nickname", () => {

    it("should add a new nickname", async () => {
        await page.goto("https://www.myrapname.com");
        await page.fill('input[name="firstname"]', "Seth");
        await page.click('input[name="Male"]');
        await page.fill('input[name="firstname"]', "Seth");
        await page.click('input[name="Male"]');
        await expect(page).toHaveText('body > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > h1', " ");
        await expect(page).toHaveText('body > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div', " ");
    });
  });

  describe("Creating another name and middle initial for a female", () => {

    it("should add another nickname", async () => {
        await page.goto("https://www.myrapname.com");
        await page.fill('input[name="firstname"]', "Nicolette");
        await page.fill('input[name="lastinitial"]', "B");
        await page.click('input[name="Female"]');
        await page.fill('input[name="firstname"]', "Nicolette");
        await page.fill('input[name="lastinitial"]', "B");
        await page.click('input[name="Female"]');
        await expect(page).toHaveText('body > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > h1', " ");
        await expect(page).toHaveText('body > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div', " ");
        await page.close();
    });
  });


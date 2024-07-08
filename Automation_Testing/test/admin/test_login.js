const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Admin Login', function () {
    let driver;

    before(async function () {
        this.timeout(80000); // Menambahkan timeout yang lebih panjang jika diperlukan
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com/');
    });

    it('should login with valid credentials', async function () {
        this.timeout(80000); // Menambahkan timeout yang lebih panjang jika diperlukan
        try {
            await driver.wait(until.elementLocated(By.id('txtUsername')), 90000); // Tunggu hingga elemen txtUsername muncul
            await driver.findElement(By.id('txtUsername')).sendKeys('Admin');
            await driver.findElement(By.id('txtPassword')).sendKeys('admin123');
            await driver.findElement(By.id('btnLogin')).click();
            await driver.wait(until.urlContains('dashboard'), 10000); // Tunggu hingga URL mengandung 'dashboard'
            let currentUrl = await driver.getCurrentUrl();
            assert.ok(currentUrl.includes('dashboard'), 'Login berhasil');
        } catch (error) {
            assert.fail(error);
        }
    });

    after(async function () {
        this.timeout(80000); // Menambahkan timeout yang lebih panjang jika diperlukan
        await driver.quit();
    });
});

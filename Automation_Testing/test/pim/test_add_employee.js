const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Add Employee', function () {
    let driver;

    before(async function () {
        this.timeout(80000); // Menambahkan timeout yang lebih panjang 
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com/');
    });

    it('should add a new employee', async function () {
        this.timeout(90000); // Menambahkan timeout yang lebih panjang jika diperlukan
        try {
            await driver.wait(until.elementLocated(By.id('txtUsername')), 90000); 
            await driver.findElement(By.id('txtUsername')).sendKeys('Admin');
            await driver.findElement(By.id('txtPassword')).sendKeys('admin123');
            await driver.findElement(By.id('btnLogin')).click();
            await driver.wait(until.elementLocated(By.id('menu_pim_viewPimModule')), 10000); 
            await driver.findElement(By.id('menu_pim_viewPimModule')).click();
            await driver.wait(until.elementLocated(By.id('menu_pim_addEmployee')), 10000); 
            await driver.findElement(By.id('menu_pim_addEmployee')).click();
            await driver.wait(until.elementLocated(By.id('firstName')), 10000); 
            await driver.findElement(By.id('firstName')).sendKeys('John');
            await driver.findElement(By.id('lastName')).sendKeys('Doe');
            await driver.findElement(By.id('btnSave')).click();
            await driver.wait(until.urlContains('viewPersonalDetails'), 10000); 
            let currentUrl = await driver.getCurrentUrl();
            assert.ok(currentUrl.includes('viewPersonalDetails'), 'Employee added successfully');
        } catch (error) {
            assert.fail(error);
        }
    });

    after(async function () {
        this.timeout(80000); // Menambahkan timeout yang lebih panjang 
        await driver.quit();
    });
});

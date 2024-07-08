const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Apply Leave', function () {
    let driver;

    before(async function () {
        this.timeout(90000); // Menambahkan timeout yang lebih panjang jika diperlukan
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com/');
    });

    it('should apply for leave', async function () {
        this.timeout(90000); // Menambahkan timeout yang lebih panjang jika diperlukan
        try {
            await driver.wait(until.elementLocated(By.id('txtUsername')), 90000); // Tunggu hingga elemen txtUsername muncul
            await driver.findElement(By.id('txtUsername')).sendKeys('Admin');
            await driver.findElement(By.id('txtPassword')).sendKeys('admin123');
            await driver.findElement(By.id('btnLogin')).click();
            await driver.findElement(By.id('menu_leave_viewLeaveModule')).click();
            await driver.findElement(By.id('menu_leave_applyLeave')).click();
            await driver.wait(until.elementLocated(By.id('applyleave_txtLeaveType')), 10000); // Tunggu hingga elemen applyleave_txtLeaveType muncul
            await driver.findElement(By.id('applyleave_txtLeaveType')).sendKeys('Paid Leave', Key.RETURN);
            await driver.findElement(By.id('applyleave_txtFromDate')).sendKeys('2024-07-15');
            await driver.findElement(By.id('applyleave_txtToDate')).sendKeys('2024-07-16');
            await driver.findElement(By.id('applyBtn')).click();
            await driver.sleep(2000); // Tunggu sebentar untuk memastikan proses selesai
            let successMessage = await driver.findElement(By.css('.message.success'));
            assert.ok(successMessage, 'Leave application successful');
        } catch (error) {
            assert.fail(error);
        }
    });

    after(async function () {
        this.timeout(90000); // Menambahkan timeout yang lebih panjang jika diperlukan
        await driver.quit();
    });
});

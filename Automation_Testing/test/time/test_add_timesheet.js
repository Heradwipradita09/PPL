const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Tambah Timesheet', function () {
    let driver;

    before(async function () {
        this.timeout(90000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com/');
    });

    it('harus menambahkan timesheet baru', async function () {
        this.timeout(90000); // Menambah timeout karena mungkin membutuhkan waktu lebih lama
        try {
            // Tunggu hingga elemen txtUsername muncul
            await driver.wait(until.elementLocated(By.id('txtUsername')), 90000);

            // Login
            await driver.findElement(By.id('txtUsername')).sendKeys('Admin');
            await driver.findElement(By.id('txtPassword')).sendKeys('admin123');
            await driver.findElement(By.id('btnLogin')).click();

            // Navigasi ke Timesheets
            await driver.findElement(By.id('menu_time_viewTimeModule')).click();
            await driver.findElement(By.id('menu_time_Timesheets')).click();

            // Tambahkan timesheet baru
            await driver.findElement(By.id('btnAddTimesheet')).click();
            await driver.findElement(By.id('timesheet_start_date')).sendKeys('2024-07-15');
            await driver.findElement(By.id('timesheet_end_date')).sendKeys('2024-07-16');
            await driver.findElement(By.id('btnSave')).click();

            // Verifikasi pesan sukses
            await driver.wait(until.elementLocated(By.css('.message.success')), 10000);
            let successMessage = await driver.findElement(By.css('.message.success'));
            assert.ok(successMessage, 'Timesheet berhasil ditambahkan');
        } catch (error) {
            assert.fail(error);
        }
    });

    after(async function () {
        this.timeout(90000);
        await driver.quit();
    });
});

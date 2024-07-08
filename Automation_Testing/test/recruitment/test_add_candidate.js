const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Tambah Kandidat Baru', function () {
    let driver;

    before(async function () {
        this.timeout(90000); // Menambahkan timeout yang lebih panjang 
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com/');
    });

    it('harus menambahkan kandidat baru', async function () {
        this.timeout(20000); // Menambahkan timeout yang lebih panjang 
        try {
            // Tunggu hingga elemen txtUsername muncul
            await driver.wait(until.elementLocated(By.id('txtUsername')), 90000);

            // Login
            await driver.findElement(By.id('txtUsername')).sendKeys('Admin');
            await driver.findElement(By.id('txtPassword')).sendKeys('admin123');
            await driver.findElement(By.id('btnLogin')).click();

            // Navigasi ke Recruitment > Candidates
            await driver.findElement(By.id('menu_recruitment_viewRecruitmentModule')).click();
            await driver.findElement(By.id('menu_recruitment_viewCandidates')).click();

            // Klik tombol Add
            await driver.findElement(By.id('btnAdd')).click();

            // Isi form tambah kandidat
            await driver.findElement(By.id('addCandidate_firstName')).sendKeys('John');
            await driver.findElement(By.id('addCandidate_lastName')).sendKeys('Doe');
            await driver.findElement(By.id('addCandidate_email')).sendKeys('johndoe@example.com');
            await driver.findElement(By.id('addCandidate_contactNo')).sendKeys('1234567890');
            await driver.findElement(By.id('addCandidate_keyWords')).sendKeys('Java, Python, Selenium');
            await driver.findElement(By.id('addCandidate_comment')).sendKeys('Experienced candidate in software testing.');

            // Simpan kandidat baru
            await driver.findElement(By.id('btnSave')).click();

            // Verifikasi pesan sukses
            await driver.wait(until.elementLocated(By.css('.message.success')), 10000);
            let successMessage = await driver.findElement(By.css('.message.success'));
            assert.ok(successMessage, 'Kandidat berhasil ditambahkan');
        } catch (error) {
            assert.fail(error);
        }
    });

    after(async function () {
        this.timeout(90000); // Menambahkan timeout yang lebih panjang 
        await driver.quit();
    });
});

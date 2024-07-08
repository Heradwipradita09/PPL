const axios = require('axios');
const { expect } = require('chai');

describe('Pengujian API OrangeHRM', function () {
    it('Mengambil data dari endpoint', async function () {
        try {
            const response = await axios.get('https://api.orangehrm.com/');
            expect(response.status).to.equal(200); // Memastikan respons status 200 OK
            expect(response.headers['content-type']).to.include('text/html'); // Memastikan tipe konten adalah JSON
            console.log(response.data); // Cetak isi dari respons untuk memeriksa kontennya
        } catch (error) {
            throw error; // Melempar error agar pengujian gagal jika terjadi kesalahan
        }
    });
});



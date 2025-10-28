// Data Biaya (Menggantikan data dari XML)
const biayaData = {
    // Biaya Berat: Didefinisikan dalam rentang dan biaya
    berat: [
        { min: 0.1, max: 1, cost: 1500 },      // 0-1 Kg: 1.500
        { min: 1.1, max: 5, cost: 2500 },     // 1,1 Kg – 5 Kg: 2.500
        { min: 5.1, max: 10, cost: 3500 },    // 5,1 Kg – 10 Kg: 3.500
        { min: 10.1, max: Infinity, cost: 4500 } // Diatas 10 Kg: 4.500
    ],

    // Biaya Jarak: Didefinisikan dalam objek bertingkat (Kota Asal -> Kota Tujuan)
    jarak: {
        Banyuwangi: {
            Banyuwangi: 5000,
            Jember: 7500,
            Probolinggo: 10000,
            Surabaya: 15000
        },
        Jember: {
            Banyuwangi: 7500,
            Jember: 5000,
            Probolinggo: 8500,
            Surabaya: 12500
        },
        Probolinggo: {
            Banyuwangi: 10000,
            Jember: 8500,
            Probolinggo: 5000,
            Surabaya: 6500
        },
        Surabaya: {
            Banyuwangi: 15000,
            Jember: 12500,
            Probolinggo: 6500,
            Surabaya: 5000
        }
    },

    // Daftar Kota (untuk mengisi dropdown)
    kota: ["Banyuwangi", "Jember", "Probolinggo", "Surabaya"]
};

// -----------------------------------------------------------
// FUNGSI UTAMA
// -----------------------------------------------------------

// Fungsi untuk mengisi dropdown Kota Asal dan Kota Tujuan
function populateCities() {
    const kotaAsalSelect = document.getElementById('kotaAsal');
    const kotaTujuanSelect = document.getElementById('kotaTujuan');

    // Menghapus opsi lama (hanya menyisakan opsi default)
    kotaAsalSelect.innerHTML = '<option value="">-- Pilih Kota Asal --</option>';
    kotaTujuanSelect.innerHTML = '<option value="">-- Pilih Kota Tujuan --</option>';

    // Mengisi dropdown dengan daftar kota dari data
    biayaData.kota.forEach(kota => {
        // Kota Asal
        let optionAsal = document.createElement('option');
        optionAsal.value = kota;
        optionAsal.textContent = kota;
        kotaAsalSelect.appendChild(optionAsal);

        // Kota Tujuan
        let optionTujuan = document.createElement('option');
        optionTujuan.value = kota;
        optionTujuan.textContent = kota;
        kotaTujuanSelect.appendChild(optionTujuan);
    });
}

// Fungsi untuk mendapatkan Biaya Berat berdasarkan berat (Kg)
function getBiayaBerat(beratKg) {
    // Mencari rentang berat yang sesuai
    const found = biayaData.berat.find(item => beratKg >= item.min && beratKg <= item.max);
    return found ? found.cost : 0; // Mengembalikan biaya atau 0 jika tidak ditemukan
}

// Fungsi untuk mendapatkan Biaya Jarak berdasarkan Kota Asal dan Kota Tujuan
function getBiayaJarak(asal, tujuan) {
    // Mengecek apakah kota asal ada, lalu mengecek apakah kota tujuan ada di dalamnya
    const biayaJarak = biayaData.jarak[asal];
    return (biayaJarak && biayaJarak[tujuan]) ? biayaJarak[tujuan] : 0; // Mengembalikan biaya atau 0 jika tidak valid
}

// Fungsi utama untuk menghitung dan menampilkan Total Biaya Pengiriman
function hitungTotalBiaya() {
    const beratBarang = parseFloat(document.getElementById('beratBarang').value);
    const kotaAsal = document.getElementById('kotaAsal').value;
    const kotaTujuan = document.getElementById('kotaTujuan').value;
    const totalBiayaInput = document.getElementById('totalBiaya');

    // Reset biaya jika ada input yang tidak valid/belum terisi
    if (isNaN(beratBarang) || beratBarang <= 0 || !kotaAsal || !kotaTujuan) {
        totalBiayaInput.value = '0';
        return;
    }

    // 1. Hitung Biaya Berat
    const biayaBerat = getBiayaBerat(beratBarang);
    
    // 2. Hitung Biaya Jarak
    const biayaJarak = getBiayaJarak(kotaAsal, kotaTujuan);

    // 3. Hitung Total Biaya
    // Total Biaya = Biaya Jarak + Biaya Berat
    const totalBiaya = biayaBerat + biayaJarak;
    
    // 4. Tampilkan Hasil (dengan format ribuan)
    // Menggunakan Intl.NumberFormat untuk format Rupiah/ribuan yang rapi
    totalBiayaInput.value = new Intl.NumberFormat('id-ID').format(totalBiaya);
}

// Event Listener: Dipanggil saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mengisi dropdown kota saat aplikasi pertama kali dibuka
    populateCities();
    
    // 2. Melakukan perhitungan awal jika ada nilai default
    // Misalnya, jika Anda memberikan value="1.5" seperti di HTML, 
    // perhitungan ini akan langsung menampilkan hasil pertama.
    hitungTotalBiaya();
});
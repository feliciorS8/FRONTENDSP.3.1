// Data Barang (sesuai gambar mockup)
const dataBarang = {
    'PC/LAPTOP': [
        { nama: 'PC/iMAC Core i7', harga: 5000000 },
        { nama: 'Laptop Acer Core i5', harga: 4500000 },
        { nama: 'Laptop Lenovo AMD Ryzen 3', harga: 3500000 }
    ],
    'AKSESORIS': [
        { nama: 'Mouse Digital - Rp. 50.000', harga: 50000 },
        { nama: 'Headset Gaming - Rp. 250.000', harga: 250000 },
        { nama: 'Speaker Aktif - Rp. 250.000', harga: 250000 }
    ],

    'MONITOR': [
        { nama: 'Monitor LED 19 inch - Rp. 1.300.000', harga: 1300000 },
        { nama: 'Monitor LED 21 inch - Rp. 2.500.000', harga: 2500000 }, 
    ]
};

// --- Elemen DOM ---
const kategoriEl = document.getElementById('kategori');
const namaBarangEl = document.getElementById('nama-barang');
const hargaSatuanEl = document.getElementById('harga-satuan');
const jumlahEl = document.getElementById('jumlah');
const jenisPenjualanEl = document.getElementById('jenis-penjualan');

const totalPenjualanEl = document.getElementById('total-penjualan');
const diskonEl = document.getElementById('diskon');
const pajakEl = document.getElementById('pajak');
const hargaTotalEl = document.getElementById('harga-total');

const btnSelectOption = document.getElementById('btn-select-option');
const btnHitung = document.getElementById('btn-hitung');
const btnUlangi = document.getElementById('btn-ulangi');

// Modal Elements
const modalOverlay = document.getElementById('modal-overlay');
const itemOptionsEl = document.getElementById('item-options');
const btnSimpanModal = document.getElementById('btn-simpan-modal');
const btnBatalModal = document.getElementById('btn-batal-modal');
const closeBtn = document.querySelector('.close-btn');

// Variabel Global untuk menyimpan data barang yang dipilih
let selectedItem = null;

// --- Fungsi Handler Modal ---

function openModal() {
    const kategori = kategoriEl.value;
    if (!kategori) {
        alert("Pilih Kategori terlebih dahulu!");
        return;
    }
    
    // Hapus pilihan sebelumnya
    itemOptionsEl.innerHTML = '';
    
    // Generate pilihan barang sesuai kategori
    const items = dataBarang[kategori];
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-option';
        
        // Format harga dengan titik sebagai pemisah ribuan (hanya untuk tampilan)
        const formattedHarga = item.harga.toLocaleString('id-ID');

        div.innerHTML = `
            <input type="radio" name="selected-item" value="${item.nama}" data-harga="${item.harga}">
            ${item.nama} - Rp. ${formattedHarga}
        `;
        itemOptionsEl.appendChild(div);
    });

    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

function simpanPilihan() {
    const selectedRadio = itemOptionsEl.querySelector('input[name="selected-item"]:checked');
    if (!selectedRadio) {
        alert("Pilih salah satu barang!");
        return;
    }

    // Ambil data dari radio button yang dipilih
    const nama = selectedRadio.value;
    const harga = parseInt(selectedRadio.dataset.harga);
    
    // Update elemen form utama
    namaBarangEl.value = nama;
    hargaSatuanEl.value = harga;
    
    // Simpan ke variabel global
    selectedItem = { nama, harga, kategori: kategoriEl.value };

    closeModal();
    hitungPenjualan(); // Hitung ulang setelah memilih barang
}

// --- Fungsi Perhitungan Utama ---

function hitungPenjualan() {
    if (!selectedItem) {
        // Hanya menghitung jika barang sudah dipilih
        return; 
    }
    
    const hargaSatuan = selectedItem.harga;
    const kategori = selectedItem.kategori;
    const jumlah = parseInt(jumlahEl.value) || 0;
    const jenisPenjualan = jenisPenjualanEl.value;

    // 1. Total Penjualan
    const totalPenjualan = hargaSatuan * jumlah;
    totalPenjualanEl.value = totalPenjualan;

    // 2. Diskon (10% jika TUNAI)
    let diskon = 0;
    if (jenisPenjualan === 'TUNAI') {
        diskon = totalPenjualan * 0.10; // 10%
    }
    diskonEl.value = diskon;

    // 3. Pajak
    let persentasePajak = 0;
    if (kategori === 'PC/LAPTOP') {
        persentasePajak = 0.15; // 15% untuk Barang Utama
    } else if (kategori === 'AKSESORIS') {
        persentasePajak = 0.10; // 10% untuk Aksesoris
    } else if (kategori === 'MONITOR') {
        persentasePajak = 0.12; // 12% untuk Monitor
    }
    
    const pajak = hargaSatuan * persentasePajak * jumlah; 
    // CATATAN: Pajak dihitung dari Harga Satuan, bukan Total Penjualan (sesuai ketentuan)
    pajakEl.value = pajak;

    // 4. Harga Total
    const hargaTotal = totalPenjualan - diskon + pajak;
    hargaTotalEl.value = hargaTotal;
}

// --- Fungsi Ulangi/Reset ---

function ulangiForm() {
    // Reset nilai input dan variabel
    kategoriEl.value = '';
    namaBarangEl.value = '';
    hargaSatuanEl.value = 0;
    jumlahEl.value = 1;
    jenisPenjualanEl.value = 'TUNAI';
    
    totalPenjualanEl.value = 0;
    diskonEl.value = 0;
    pajakEl.value = 0;
    hargaTotalEl.value = 0;
    
    selectedItem = null;
    alert("Formulir telah direset!");
}


// --- Event Listeners ---

btnSelectOption.addEventListener('click', openModal);

btnSimpanModal.addEventListener('click', simpanPilihan);
btnBatalModal.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

// Tutup modal jika klik di luar konten modal
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

btnHitung.addEventListener('click', () => {
    if (!selectedItem) {
        alert("Pilih barang terlebih dahulu!");
        return;
    }
    hitungPenjualan();
});

btnUlangi.addEventListener('click', ulangiForm);

// Perbarui perhitungan secara dinamis ketika Jumlah atau Jenis Penjualan berubah
jumlahEl.addEventListener('input', hitungPenjualan);
jenisPenjualanEl.addEventListener('change', hitungPenjualan);

// Reset field barang saat kategori berubah
kategoriEl.addEventListener('change', () => {
    namaBarangEl.value = '';
    hargaSatuanEl.value = 0;
    selectedItem = null;
    hitungPenjualan(); // Reset perhitungan
});

// Inisialisasi awal
ulangiForm();

// 1. Data Statis (Objek JavaScript)
// Kunci (key) adalah nama benua, dan isinya adalah array Negara.
const dataLokasi = {
    asia: ["Jepang", "Indonesia", "Korea Selatan", "India"],
    eropa: ["Jerman", "Prancis", "Italia", "Spanyol"],
    amerika: ["Amerika Serikat", "Kanada", "Brasil", "Meksiko"]
};

// 2. Fungsi untuk menginisialisasi Dropdown Benua saat halaman dimuat
function inisialisasiBenua() {
    const selectBenua = document.getElementById("benua");

    // Tambahkan opsi default
    let defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Pilih Benua --";
    selectBenua.appendChild(defaultOption);

    // Iterasi melalui dataLokasi dan tambahkan opsi Benua
    for (const benuaKey in dataLokasi) {
        let option = document.createElement('option');
        // Gunakan key sebagai value (misalnya: "asia")
        option.value = benuaKey;
        // Ubah key menjadi teks yang lebih rapi (misalnya: "Asia")
        option.textContent = benuaKey.charAt(0).toUpperCase() + benuaKey.slice(1);
        selectBenua.appendChild(option);
    }
}

// 3. Fungsi yang dipanggil saat pilihan Benua diubah
function updateNegara() {
    const selectBenua = document.getElementById("benua");
    const selectNegara = document.getElementById("negara");
    const hasilElement = document.getElementById("hasil");

    // Dapatkan value benua yang dipilih
    const benuaTerpilih = selectBenua.value;

    // 4. Reset Dropdown Negara
    // Cara umum untuk menghapus semua opsi lama
    selectNegara.innerHTML = '';
    hasilElement.textContent = ''; // reset hasil

    // 5. Periksa apakah Benua Telah Dipilih
    if (benuaTerpilih) {
        // 5.1. Tambahkan opsi default "Pilih Negara"
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Pilih Negara --";
        selectNegara.appendChild(defaultOption);

        // 5.2. Ambil array negara berdasarkan benuaTerpilih
        const negaraArray = dataLokasi[benuaTerpilih];

        // 5.3. Iterasi dan tambahkan opsi Negara
        negaraArray.forEach(negara => {
            let option = document.createElement('option');
            // Contoh value: "jepang", Contoh teks: "Jepang"
            option.value = negara.toLowerCase().replace(/[\s\W]/g, '');
            option.textContent = negara;
            selectNegara.appendChild(option);
        });

        // 5.4. Tambahkan event listener ke dropdown negara (dipanggil saat negara dipilih)
        selectNegara.onchange = tampilkanHasil;
    } else {
        // Blok kode yang berjalan ketika default (value "") dipilih, kembalikan ke awal.
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Pilih Benua Dahulu --";
        selectNegara.appendChild(defaultOption);
    }
}

// 4. Fungsi untuk menampilkan hasil akhir
function tampilkanHasil() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');

    const benuaTeks = selectBenua.options[selectBenua.selectedIndex].textContent;
    const negaraTeks = selectNegara.options[selectNegara.selectedIndex].textContent;

    if (selectNegara.value) {
        hasilElement.textContent = `Anda memilih: ${negaraTeks}, yang terletak di benua ${benuaTeks}.`;
        hasilElement.style.color = 'green';
    } else {
        hasilElement.textContent = 'Silakan lengkapi pilihan Anda.';
        hasilElement.style.color = 'orange';
    }
}

// Panggil fungsi inisialisasi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', inisialisasiBenua);
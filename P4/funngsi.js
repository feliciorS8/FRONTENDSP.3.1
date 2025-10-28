var dataBarang = [
    "Buku",
    "Pensil",
    "Penghapus",
    "Penggaris"
];

function showBarang() {
    var listBarang = document.getElementById("list-barang");
    //clear list brng
    listBarang.innerHTML = "";

    //cetak semua barang

        for (let i = 0; i < dataBarang.length; i++) {
        // Buat link Edit dan Hapus
        var btnEdit = "<a href='#' onclick='editBarang(" + i + ")'>Edit</a>";
        var btnHapus = "<a href='#' onclick='deleteBarang(" + i + ")'>Hapus</a>";
        
        // Tambahkan item list ke dalam listBarang (UL/OL)
        listBarang.innerHTML += "<li>" + dataBarang[i] + " [" + btnEdit + " | " + btnHapus + "] </li>";
    }
}

function addBarang() {
    function addBarang() {
    // Ambil nilai dari input form
    var input = document.querySelector("input[name=barang]");
    
    // Tambahkan nilai ke array
    dataBarang.push(input.value);
    
    // Kosongkan input setelah ditambah
    input.value = "";
    
    // Panggil ulang showBarang untuk memperbarui tampilan
    showBarang();
}
function editBarang(id) {
    // Tampilkan prompt untuk mendapatkan nama baru
    var newBarang = prompt("Nama baru:", dataBarang[id]);
    
    // Cek jika pengguna memasukkan nilai dan tidak membatalkan
    if (newBarang) {
        dataBarang[id] = newBarang; // Perbarui data
        showBarang(); // Perbarui tampilan
    }
}

// Fungsi DELETE: Menghapus barang berdasarkan indeks (id)
function deleteBarang(id) {
    // Konfirmasi penghapusan
    var konfirmasi = confirm("Yakin ingin menghapus " + dataBarang[id] + "?");
    
    if (konfirmasi) {
        // Hapus 1 elemen dari array pada posisi 'id'
        dataBarang.splice(id, 1);
        showBarang(); // Perbarui tampilan
    }
}

// Jalankan fungsi pertama kali saat file dimuat untuk menampilkan data awal
showBarang();

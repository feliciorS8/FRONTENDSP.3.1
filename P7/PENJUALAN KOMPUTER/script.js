function openPopup(type) {
  if (type === 'pc-laptop') {
    document.getElementById('popupPCLaptop').style.display = 'block';
  } else if (type === 'aksesoris') {
    document.getElementById('popupAksesoris').style.display = 'block';
  } else if (type === 'surat') {
    document.getElementById('popupSurat').style.display = 'block';
  }
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

// Close popup when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('popup')) {
    event.target.style.display = 'none';
  }
}

function pilihBarang(nama, harga, kategori) {
  document.getElementById('kategori').value = kategori;
  document.getElementById('namaBarang').value = nama;
  document.getElementById('hargaSatuan').value = harga;
  
  // Close all popups
  closePopup('popupPCLaptop');
  closePopup('popupAksesoris');
}

function formatRupiah(angka) {
  return 'Rp. ' + angka.toLocaleString('id-ID');
}

function hitungTotal() {
  const kategori = document.getElementById('kategori').value;
  const hargaSatuan = parseFloat(document.getElementById('hargaSatuan').value) || 0;
  const jumlah = parseInt(document.getElementById('jumlah').value) || 0;
  const jenisPenjualan = document.getElementById('jenisPenjualan').value;

  // Hitung total penjualan
  const totalPenjualan = hargaSatuan * jumlah;

  // Hitung diskon (10% jika tunai)
  let diskon = 0;
  if (jenisPenjualan === 'tunai') {
    diskon = totalPenjualan * 0.10;
  }

  // Hitung pajak
  let pajak = 0;
  if (kategori === 'PC / LAPTOP') {
    pajak = hargaSatuan * 0.15; // 15% untuk barang utama
  } else if (kategori === 'AKSESORIS') {
    pajak = hargaSatuan * 0.10; // 10% untuk aksesoris
  }
  pajak = pajak * jumlah;

  // Hitung harga total
  const hargaTotal = totalPenjualan - diskon + pajak;

  // Tampilkan hasil
  document.getElementById('totalPenjualan').textContent = formatRupiah(totalPenjualan);
  document.getElementById('diskon').textContent = formatRupiah(diskon);
  document.getElementById('pajak').textContent = formatRupiah(pajak);
  document.getElementById('hargaTotal').textContent = formatRupiah(hargaTotal);
}
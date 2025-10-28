// =======================
// 1. Output Dasar
// =======================
console.log("Hello dari file external!");
alert("Halo, ini dari file external!");
document.write("Ini ditulis dr file external.<br>");
document.getElementById("judul").innerHTML =
  "Belajar JavaScript dr file external";

// =======================
// 2. Variabel
// =======================
var nama = "dija bsa";
let umur = 15;
let favorite_buku = "Biologi dan Fisika";
var Kampus= "cetikumm banyuwangii";
var skill = "berserah diri";

let kalimat = `halo SAYANGGG!! kenalin aku ${nama}.
aku berusia ${umur} tahun,favorite buku aku adalahhh ${favorite_buku}.walaupun gabisa-bisa tapi aku suka:(
aku kuliah di ${Kampus}
dengan skill terrr yaitu${skill}.`;

alert(kalimat);
document.getElementById("output").innerHTML = kalimat;

// =======================
// 3. Jendela Dialog
// =======================
let namaInput = prompt("kenalan dulu sinten sampean?", "Guest");
let lanjut = confirm("mau lanjut ga?");
if (lanjut) {
  alert("mantapp " + namaInput + ", selamat PUSYINGGG javascript!");
} else {
  alert("yah ko udahan " + namaInput + "!");
}

// =======================
// 4. Operator
// =======================
let a = 10,
  b = 5;
let nilai = 90;

// Aritmatika
console.log("Tambah:", a + b);
console.log("Kurang:", a - b);
console.log("Kali:", a * b);
console.log("Bagi:", a / b);
console.log("Modulus:", a % b);
console.log("Pangkat:", a ** b);

// Penugasan
let x = 5;
x += 2;
console.log("x setelah += 2:", x);

// Perbandingan
console.log("Apakah umur == 20?", umur == 20);
console.log("Apakah umur > 18?", umur > 18);

// Logika
console.log("true && false =", true && false);
console.log("true || false =", true || false);
console.log("!true =", !true);

// Ternary
let hasil = nilai >= 60 ? "Lulus" : "Tidak Lulus";
console.log("Hasil nilai:", hasil);

// =======================
// 5. Percabangan
// =======================
// If-Else If
let grade;
if (nilai >= 85) {
  grade = "A";
} else if (nilai >= 70) {
  grade = "B";
} else if (nilai >= 60) {
  grade = "C";
} else {
  grade = "D";
}

// Switch
let hari = "Senin";
let pesan;
switch (hari) {
  case "Senin":
    pesan = "Awal minggu";
    break;
  case "Jumat":
    pesan = "Akhir minggu kerja";
    break;
  default:
    pesan = "Hari biasa";
}

// Nested If (Password Check)
let username = "admin";
let password = "12345";
let statusLogin;

if (username === "admin") {
  if (password === "12345") {
    statusLogin = "Login berhasil";
  } else {
    statusLogin = "Password salah";
  }
} else {
  statusLogin = "Username tidak ditemukan";
}

// =======================
// 6. Tampilkan Semua ke HTML
// =======================
document.getElementById(
  "output"
).innerHTML += `<br><br>Nilai kamu: ${nilai}, Grade: ${grade}<br>
   Hari ini: ${hari}, Pesan: ${pesan}<br>
   Status Login: ${statusLogin}`;
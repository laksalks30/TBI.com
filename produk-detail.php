produk-detail.php <?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}

$nama = $_SESSION['user']['nama'] ?? 'Pengguna';
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Produk Semen</title>
  <link rel="stylesheet" href="style-produk-detail.css">
</head>
<body>

<header>
  <div class="logo">Toko Bangunan Ibu</div>
  <input type="text" placeholder="Cari Bahan Bangunan">
  <div class="nav-kanan">
    <a href="keranjang.php">🛒</a>
    <a href="logout.php">Masuk</a>
  </div>
</header>

<div class="produk-detail">
  <div class="produk-gambar">
    <img src="assets/semen.jpg" alt="Semen">
  </div>
  <div class="produk-info">
    <h1>Semen</h1>
    <p class="harga">Rp1.000.000</p>
    <p class="deskripsi">
      Pilihan tepat untuk berbagai kebutuhan konstruksi, mulai dari struktur bangunan hingga pekerjaan plesteran dan pasangan bata. Dirancang dengan formula khusus yang memberikan daya rekat tinggi dan waktu pengerjaan yang optimal.
    </p>

    <div class="variasi">
      <p>Berat</p>
      <button>40kg</button>
      <button>80kg</button>
      <button>100kg</button>
    </div>

    <div class="jumlah">
      <p>Jumlah</p>
      <button>-</button>
      <input type="number" value="1">
      <button>+</button>
    </div>

    <button class="tambah">Tambah ke Keranjang</button>
  </div>
</div>

<footer>
  <div class="footer-col">
    <h4>Toko Bangunan Ibu</h4>
    <p>WhatsApp: +62 895-2192-2132</p>
    <p>Call: +62 896-2192-2132</p>
  </div>
  <div class="footer-col">
    <h4>Layanan Pelanggan</h4>
    <ul>
      <li><a href="#">About Us</a></li>
      <li><a href="#">Terms & Conditions</a></li>
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Cancellation & Return Policy</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4>Download Aplikasi</h4>
    <img src="assets/playstore.png" width="120">
    <img src="assets/appstore.png" width="120">
  </div>
</footer>

<div class="copyright">© 2025 All rights reserved.</div>

</body>
</html>

<?php
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
  <title>Produk - Toko Bangunan Ibu</title>
  <link rel="stylesheet" href="style-produk.css">
</head>
<body>

<header>
  <div class="logo">Toko Bangunan Ibu</div>
  <input type="text" placeholder="Cari bahan bangunan">
  <div class="nav-kanan">
    <a href="keranjang.php">🛒 Keranjang</a>
    <a href="logout.php">👤 Halo, <?= htmlspecialchars($nama) ?> (Keluar)</a>
  </div>
</header>

<div class="content">
  <aside class="sidebar">
    <h3>Filters</h3>
    <p>Kategori</p>
    <label><input type="checkbox"> Perkakas</label><br>
    <label><input type="checkbox"> Kayu</label><br>
    <label><input type="checkbox"> Semen</label><br>
    <label><input type="checkbox"> Obeng</label><br>
  </aside>

  <main class="produk-area">
    <div class="produk-header">
      <span>Urutkan: <select><option>Terbaru</option></select></span>
      <span>Menampilkan 6 Produk</span>
    </div>

    <div class="produk-grid">
      <div class="produk-item">
        <img src="assets/semen.jpg">
        <p>Semen<br><span>Rp10.000.000</span></p>
      </div>
      <div class="produk-item">
        <img src="assets/kayu.jpg">
        <p>Kayu Jati<br><span>Rp500.000</span></p>
      </div>
      <div class="produk-item">
        <img src="assets/bor.jpg">
        <p>Bor<br><span>Rp350.000</span></p>
      </div>
      <div class="produk-item">
        <img src="assets/obeng.jpg">
        <p>Obeng<br><span>Rp80.000</span></p>
      </div>
      <div class="produk-item">
        <img src="assets/baut.jpg">
        <p>Baut<br><span>Rp500</span></p>
      </div>
      <div class="produk-item">
        <img src="assets/pasir.jpg">
        <p>Pasir<br><span>Rp350.000</span></p>
      </div>
    </div>

    <button class="load-more">Muat lebih banyak produk</button>
  </main>
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
      <li><a href="#">Tentang Kami</a></li>
      <li><a href="#">Syarat & Ketentuan</a></li>
      <li><a href="#">Kebijakan Privasi</a></li>
      <li><a href="#">FAQ</a></li>
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

<?php include 'header.php'; ?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard - Toko Bangunan Ibu</title>
  <link rel="stylesheet" href="style-dashboard.css">
</head>
<body>

<div class="banner">
  <img src="banner toko.jpg" alt="Banner Toko">
</div>

<section class="kategori">
  <h2>Kategori</h2>
  <div class="kategori-wrapper">
    <div class="item">
      <img src="assets/perkakas.jpg" alt="Perkakas">
      <p>Perkakas</p>
    </div>
    <div class="item">
      <img src="assets/kayu.jpg" alt="Kayu">
      <p>Kayu</p>
    </div>
    <div class="item">
      <img src="assets/semen.jpg" alt="Semen">
      <p>Semen</p>
    </div>
  </div>
</section>

<section class="produk">
  <h2>Produk Terbaru</h2>
  <a href="produk.php"><button>Lihat Semua</button></a>
  <div class="produk-wrapper">
    <div class="item">
      <img src="assets/palu.jpg" alt="Palu">
      <p>Palu<br><span>Rp100.000</span></p>
    </div>
    <div class="item">
      <img src="assets/obeng.jpg" alt="Obeng">
      <p>Obeng<br><span>Rp85.000</span></p>
    </div>
    <div class="item">
      <img src="assets/kunci.jpg" alt="Kunci Sok">
      <p>Kunci Sok<br><span>Rp250.000</span></p>
    </div>
  </div>
</section>

<section class="produk">
  <h2>Produk Kami</h2>
  <a href="produk.php"><button>Lihat Semua</button></a>
  <div class="produk-wrapper">
    <div class="item">
      <img src="assets/semen2.jpg" alt="Semen">
      <p>Semen<br><span>Rp10.000.000</span></p>
    </div>
    <div class="item">
      <img src="assets/baut.jpg" alt="Baut">
      <p>Baut<br><span>Rp500</span></p>
    </div>
    <div class="item">
      <img src="assets/bor.jpg" alt="Bor">
      <p>Bor<br><span>Rp350.000</span></p>
    </div>
  </div>
</section>

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
    <img src="assets/playstore.png" alt="Play Store" width="130"><br><br>
    <img src="assets/appstore.png" alt="App Store" width="130">
  </div>
</footer>

<div class="copyright">© 2025 All rights reserved.</div>

</body>
</html>

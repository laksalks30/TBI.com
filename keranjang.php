<?php
session_start();

// Dummy data untuk simulasi isi keranjang
$keranjang = [
  [
    'nama' => 'Semen',
    'gambar' => 'assets/semen.jpg',
    'harga' => 1000000,
    'berat' => '40kg',
    'jumlah' => 1
  ]
];

$subtotal = 0;
foreach ($keranjang as $item) {
  $subtotal += $item['harga'] * $item['jumlah'];
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Keranjang - Toko Bangunan Ibu</title>
  <link rel="stylesheet" href="style-keranjang.css">
</head>
<body>

<header>
  <div class="logo">Toko Bangunan Ibu</div>
  <input type="text" placeholder="Cari Bahan Bangunan">
  <a href="login.php" class="login-link">Masuk</a>
</header>

<main>
  <section class="keranjang-container">
    <div class="keranjang-kiri">
      <h2>Keranjangmu</h2>
      <p>Belum siap checkout? Lanjut belanja</p>

      <?php foreach ($keranjang as $item): ?>
        <div class="item">
          <img src="<?= $item['gambar'] ?>" alt="<?= $item['nama'] ?>">
          <div>
            <strong><?= $item['nama'] ?></strong><br>
            Berat: <?= $item['berat'] ?><br>
            Jumlah: <?= $item['jumlah'] ?><br>
            <span>Rp<?= number_format($item['harga'], 0, ',', '.') ?></span><br>
            <a href="#">Hapus</a>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="keranjang-kanan">
      <h3>Ringkasan Pesanan</h3>
      <input type="text" placeholder="Masukkan Kupon"><br>
      <p>Subtotal: <strong>Rp<?= number_format($subtotal, 0, ',', '.') ?></strong></p>
      <p>Pengiriman: <em>Dihitung di tahap berikutnya</em></p>
      <p>Total: <strong>Rp<?= number_format($subtotal, 0, ',', '.') ?></strong></p>
      <button>Lanjut</button>
    </div>
  </section>
</main>

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

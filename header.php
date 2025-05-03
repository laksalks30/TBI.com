<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}
$nama = $_SESSION['user']['nama'] ?? 'Pengguna';
?>

<header>
  <div class="logo">Toko Bangunan Ibu</div>
  <input type="text" placeholder="Cari bahan bangunan">
  <div class="nav-kanan">
    <a href="dashboard.php">🏠 Beranda</a>
    <a href="produk.php">🧱 Produk</a>
    <a href="keranjang.php">🛒 Keranjang</a>
    <a href="logout.php">👤 Halo, <?= htmlspecialchars($nama) ?> (Keluar)</a>
  </div>
</header>

<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama     = $_POST['nama'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $confirm  = $_POST['confirm_password'];

    // Validasi konfirmasi password
    if ($password != $confirm) {
        echo "<script>alert('Konfirmasi password tidak sesuai'); window.history.back();</script>";
        exit;
    }

    // Enkripsi password
    $hashed = password_hash($password, PASSWORD_DEFAULT);

    // Simpan ke database
    $stmt = $conn->prepare("INSERT INTO users (nama, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nama, $email, $hashed);

    if ($stmt->execute()) {
        echo "<script>alert('Pendaftaran berhasil! Silakan login.'); window.location='login.html';</script>";
    } else {
        echo "<script>alert('Email sudah digunakan atau error!'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Daftar Akun - Toko Bangunan Ibu</title>
  <link rel="stylesheet" href="styleregister.css" />
</head>
<body>
  <div class="container">
    <!-- KIRI: Gambar dan Judul -->
    <div class="left">
      <h1>Toko Bangunan Ibu</h1>
      <img src="pengiriman.png" alt="Ilustrasi Pengiriman" />
    </div>

    <!-- KANAN: Formulir -->
    <div class="right">
      <a href="index.html" class="back-link">← Kembali</a>
      <h2>Daftar Akun</h2>
      <form action="register.php" method="POST">
        <label for="nama">Nama</label>
        <input type="text" name="nama" id="nama" required />

        <label for="email">Alamat Email</label>
        <input type="email" name="email" id="email" required />

        <label for="password">Kata Sandi</label>
        <input type="password" name="password" id="password" required />

        <label for="confirm_password">Konfirmasi Kata Sandi</label>
        <input type="password" name="confirm_password" id="confirm_password" required />

        <div class="checkbox">
          <input type="checkbox" id="ingat" />
          <label for="ingat">Ingat Saya</label>
        </div>

        <button type="submit">Daftar</button>

        <p class="register-link">Sudah Punya Akun? <a href="index.html">Masuk</a></p>
      </form>
    </div>
  </div>
</body>
</html>

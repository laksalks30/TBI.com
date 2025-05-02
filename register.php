<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama     = $_POST['nama'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $confirm  = $_POST['confirm_password'];

    if ($password != $confirm) {
        echo "<script>alert('Konfirmasi password tidak cocok'); window.history.back();</script>";
        exit;
    }

    $hashed = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (nama, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nama, $email, $hashed);

    if ($stmt->execute()) {
        echo "<script>alert('Pendaftaran berhasil! Silakan login.'); window.location='login.php';</script>";
    } else {
        echo "<script>alert('Email sudah digunakan!'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daftar Akun</title>
  <link rel="stylesheet" href="styleregister.css">
</head>
<body>
  <div class="container">
    <div class="left">
      <h1>Toko Bangunan Ibu</h1>
      <img src="assets/pengiriman.png" alt="Gambar">
    </div>
    <div class="right">
      <a href="login.php" class="back-link">← Kembali</a>
      <h2>Daftar Akun</h2>
      <form action="register.php" method="POST">
        <label>Nama</label>
        <input type="text" name="nama" required>
        <label>Email</label>
        <input type="email" name="email" required>
        <label>Kata Sandi</label>
        <input type="password" name="password" required>
        <label>Konfirmasi Kata Sandi</label>
        <input type="password" name="confirm_password" required>
        <div class="checkbox">
          <input type="checkbox" id="ingat">
          <label for="ingat">Ingat Saya</label>
        </div>
        <button type="submit">Daftar</button>
        <p class="register-link">Sudah punya akun? <a href="login.php">Masuk</a></p>
      </form>
    </div>
  </div>
</body>
</html>

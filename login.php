<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email    = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user;
        header("Location: dashboard.php");
        exit;
    } else {
        echo "<script>alert('Email atau password salah'); window.history.back();</script>";
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
  <title>Masuk</title>
  <link rel="stylesheet" href="stylelogin.css">
</head>
<body>
  <div class="container">
    <div class="left">
      <h1>Toko Bangunan Ibu</h1>
      <img src="assets/elektrik.png" alt="Gambar Teknisi">
    </div>
    <div class="right">
      <h2>Masuk Akun</h2>
      <form action="login.php" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" required>
        <label for="password">Kata Sandi</label>
        <input type="password" name="password" required>
        <div class="checkbox">
          <input type="checkbox" id="ingat">
          <label for="ingat">Ingat Saya</label>
        </div>
        <button type="submit">Masuk</button>
        <p class="register-link">Belum punya akun? <a href="register.php">Daftar</a></p>
      </form>
    </div>
  </div>
</body>
</html>

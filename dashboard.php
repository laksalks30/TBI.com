<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
</head>
<body>
  <h1>Halo, <?php echo $_SESSION['user']['nama']; ?>!</h1>
  <p>Selamat datang di dashboard Toko Bangunan Ibu.</p>
</body>
</html>

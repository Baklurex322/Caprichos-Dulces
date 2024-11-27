<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caprichos Dulces</title>

    <!-- Css predetemidados -->
     <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/nav.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/cssPrincipal.css">

    <!-- css pagina -->
     <link rel="stylesheet" href="css/cssIndex/indexCss.css">

</head>
<body>
    <!-- Barra de navegacion -->
    
    <?php include 'nav.php'; ?>
    <!-- fin del nav--->
    <div id="nav-placeholder"></div>
    <script>
        fetch("nav.html")
          .then(response => response.text())
          .then(data => {
            document.getElementById("nav-placeholder").innerHTML = data;
          });
      </script>
    <!-- main -->
    <main id="banner">
        <header>
            <button onclick="location.href='contacto.html'">Contacto</button>
            <button onclick="location.href='catologo.html'">Catalogo</button>
        </header>
    </main>
    <!-- Pie de pagina -->
    <div id="footer-placeholder"></div>
    <script>
        fetch("footer.html")
          .then(response => response.text())
          .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
          });
      </script>
</body>
</html>
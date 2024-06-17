---
layout: default
title: Trent B. Thomas
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background: url('assets/background.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #333;
    }
    .container {
      max-width: 800px;
      margin: 50px auto;
      background: rgba(255, 255, 255, 0.9);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 2.5em;
      text-align: center;
      margin-bottom: 20px;
      color: #0056b3;
    }
    h2 {
      font-size: 1.5em;
      margin-top: 20px;
      color: #007bff;
    }
    a {
      color: #0056b3;
      text-decoration: none;
      transition: color 0.3s;
    }
    a:hover {
      color: #003d7a;
    }
    .section {
      margin-bottom: 20px;
    }
    .contact-info {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    .contact-info a {
      text-align: center;
      color: #007bff;
    }
    .contact-info a:hover {
      color: #003d7a;
    }
    .contact-info i {
      font-size: 1.5em;
      margin-bottom: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: lightgray;
    }
  </style>
  <title>{{ page.title }}</title>
</head>
<body>
  <div class="container">
    <h1>Trent B. Thomas's Personal Website</h1>
    <p>I study planetary science and astrobiology at the <a href="https://ess.uw.edu/people/trent-thomas/" target="_blank">University of Washington</a>.</p>
    <p>See my <a href="assets/tthomas_cv.pdf" target="_blank">Curriculum Vitae</a> and <a href="https://scholar.google.com/citations?user=e_IjiKcAAAAJ&hl=en&authuser=1" target="_blank">Google Scholar profile</a>.</p>
    
    <div class="section">
      <h2>Science</h2>
      <p><a href="/pages/research_interests.md">Research interests</a> <br>
      <a href="/pages/publications_and_code.md">Publications and code</a> <br>
      <a href="/pages/outreach.md">Outreach</a></p>
    </div>
    
    <div class="section">
      <h2>Personal</h2>
      <p><a href="/pages/about.md">About me</a> <br>
      <a href="/pages/trents_book_club.md">Trent's Book Club</a> <br>
      <a href="/pages/creative_coding.md">Creative coding</a></p>
    </div>
    
    <div class="section contact-info">
      <a href="mailto:tbthomas@uw.edu" target="_blank"><i class="fas fa-envelope"></i><br>Email</a>
      <a href="https://twitter.com/trentag0n" target="_blank"><i class="fab fa-twitter"></i><br>Twitter</a>
      <a href="https://github.com/trentagon" target="_blank"><i class="fab fa-github"></i><br>Github</a>
    </div>
    
    <div class="footer">
      The design of this website embraces digital brutalism, which emphasizes fast, clear, and memory-efficient user interfaces.
    </div>
  </div>
  
  <!-- FontAwesome for icons -->
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</body>
</html>

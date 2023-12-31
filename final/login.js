document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", function () {
    // Kullanıcı adı ve şifreyi alın
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (validateCredentials(username, password)) {
      alert("Login successful!");
      // Giriş başarılıysa yönlendirme işlemini gerçekleştirin
      window.location.href = "addcourse.html";
    } else {
      alert("Invalid username or password. Please try again.");
      // Giriş başarısızsa yapılacak işlemleri burada gerçekleştirin
    }
  });

  function validateCredentials(username, password) {
    // Örnek: Basit bir doğrulama
    const validUsername = "user123";
    const validPassword = "pass123";

    return username === validUsername && password === validPassword;
  }
});



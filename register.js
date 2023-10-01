const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});





document.querySelector('a[href="#registration"]').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default behavior of the link
  const targetSection = document.getElementById('registration'); // Get the target section by its ID
  if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section smoothly
  }
});

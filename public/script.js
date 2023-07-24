const body = document.body;
const submitContactBtn = document.getElementById("submitContactForm");
const errorName = document.getElementById("nameError");
const errorEmail = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const errorMail = document.getElementById("mailError");
const btnLogin = document.getElementById("submitLogIn");
const loginForm = document.getElementById("adminLogInForm");
const adminPage = document.getElementById("adminPage");
const contactForm = document.getElementById("contactForm");
const mailError = document.getElementById("mailError");
const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const answer = document.getElementById("answer");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("textarea");
const skillsList = document.getElementById("listOfSkills");
const menu = document.querySelector("#nav-list").cloneNode(1);

//////////////////////////////////////////////// function to validate the contact form
async function validateContactForm(event) {
  event.preventDefault();
  const name = document.contactform.name.value;
  const email = document.contactform.email.value;
  const message = document.contactform.message.value;

  try {
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      document.contactform.reset();
      answer.textContent = "Thank you for your message!";
      answer.style.display = "block";
    } else {
      const errorData = await response.json();
      console.error("Failed to save data:", errorData.error);
      answer.textContent = errorData.error;
      answer.style.display = "block";
    }
  } catch (error) {
    console.error("Error:", error);
    answer.textContent = error;
    answer.style.display = "block";
  }
}

//////////////////////////////////////////////// function to validate log in
function validateLogIn(event) {
  event.preventDefault();
  const mail = document.loginform.mail.value;
  const password = document.loginform.password.value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail, password }),
  })
    .then((response) => {
      if (response.status === 200) {
        document.loginform.reset();
        window.location.href = "/admin";
      } else {
        mailError.textContent = "Invalid email or password";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/////////////////////////////////////////////HAMBURGER MENU
function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

const links = Array.from(menu.children);
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}

//////////////////////////////////////////////////// smooth scroll to target element
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

////////////////////////////////////////// function to fetch skill data
async function fetchSkills() {
  try {
    const response = await fetch("/admin/skills");
    const skills = await response.json();
    return skills;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}
///////////////////////////////////////////////  function to display skills on the page
function renderSkills(skills) {
  skillsList.innerHTML = "";
  skills.forEach((skill) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <h3>${skill.Name}</h3>
        <p class="subHeader">${skill.Experience}</p>
      `;
    skillsList.appendChild(listItem);
  });
}
function hideAnswer() {
  answer.style.display = "none";
}

window.addEventListener("DOMContentLoaded", async () => {
  const skills = await fetchSkills();
  renderSkills(skills);
});
submitContactBtn.addEventListener("click", validateContactForm);
loginForm.addEventListener("submit", validateLogIn);
hamb.addEventListener("click", hambHandler);
nameInput.addEventListener("input", hideAnswer);
emailInput.addEventListener("input", hideAnswer);
messageInput.addEventListener("input", hideAnswer);

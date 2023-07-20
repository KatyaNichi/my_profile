const proxyUrl = " https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://api.linkedin.com/v2/me";
const finalUrl = proxyUrl + targetUrl;
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
const body = document.body;

function hideAnswer() {
  answer.style.display = "none";
}

const fetchLinkedInData = async () => {
  const response = await fetch(finalUrl, {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "Bearer AQVYoah3eyaHpwRv37vR79corBSu7KqqIalQTENjDHajddROFG5KjF7szV-0A_mr5RMpljkrC0zBxPK3k6UsYvI9CQLkPDjH5mS91ANwcUAFniqo1B3JHq-8C1UnkO0TCzLnPnU9gNrNqbnhzmxOkFeMR7mlwIYSClyMnA2lWgWK0TJcO0KH_V2Gmc9VK71t6Ck_DysA2S1xyaJQeuW7fpunP9FxLCD8KxTGhY4CD6G6ys8FuyCwuLqeOIUwogW76gUFADO2vq7SqsUfQ8Zk1-1gArTk-kwUWD62qfKA4ynHLvDbjOhFKFaHTrKzgw8Hv3v0PfXJSFJbHt5XR1-qgoDoMIAeTQ",
    },
  });
  const data = await response.json();

  const firstName = data.localizedFirstName;
  const lastName = data.localizedLastName;
  const headerName = document.getElementById("fetchedName");
  headerName.textContent = `${firstName} ${lastName}. `;
};
fetchLinkedInData();

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
      // show message
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

/////////////////////////HAMBURGER MENU

const menu = document.querySelector("#nav-list").cloneNode(1);

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

//////////////////////////////////////////////////// Smooth scroll to target element and offset for fixed menu
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

submitContactBtn.addEventListener("click", validateContactForm);
loginForm.addEventListener("submit", validateLogIn);
hamb.addEventListener("click", hambHandler);
nameInput.addEventListener("input", hideAnswer);
emailInput.addEventListener("input", hideAnswer);
messageInput.addEventListener("input", hideAnswer);

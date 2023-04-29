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

function validateform(event) {
  event.preventDefault();
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const name = document.contactform.name.value;
  const email = document.contactform.email.value;
  const message = document.contactform.message.value;
  if (name == null || name == "") {
    errorName.textContent = "Please enter your name here to continue";
  } else {
    errorName.textContent = "";
    if (email == null || email == "") {
      errorEmail.textContent = "Please enter your email here to continue";
    } else if (!email.match(validRegex)) {
      errorEmail.textContent = "Please enter a valid email";
    } else {
      errorEmail.textContent = "";
      if (message == null || message == "") {
        messageError.textContent = "Please write your message here";
      } else {
        messageError.textContent = "";
        contactForm.reset();
      }
    }
  }

  // var password=document.myform.password.value;
}
function validateLogIn(event) {
  event.preventDefault();
  const mail = document.loginform.mail.value;
  const password = document.loginform.password.value;
  if (mail == "katka@mail.se" && password == "k1a2t3k4a5") {
    loginForm.reset();
    adminPage.style.display = "block";
  } else {
    mailError.textContent = "Invalid email or password";
  }
  console.log({ mail, password });
  console.log("hej");
}

submitContactBtn.addEventListener("click", validateform);
loginForm.addEventListener("submit", validateLogIn);

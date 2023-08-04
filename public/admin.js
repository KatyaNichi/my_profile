const popup = document.querySelector("#popup");
const body = document.body;
const menu = document.querySelector("#mobile-menu");
const logoutButton = document.getElementById("logoutButton");
const fetchJokeBtn = document.getElementById("fetchJokeBtn");

//////////////////////////////////////////////////// Smooth scroll to target element
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

//////////////////////////////////////////////////// function to fetch skill data from the server
async function fetchSkills() {
  try {
    const response = await fetch("/admin/skills");
    const skills = await response.json();
    renderSkillsTable(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
  }
}

////////////////////////////////////////////////// function to fetch messages from the server
async function fetchMessages() {
  try {
    const response = await fetch("/admin/messages");
    const messages = await response.json();
    renderMessages(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
}

/////////////////////////////////////////////// function to render messages
function renderMessages(messages) {
  const tableBody = document.getElementById("messagesTableBody");
  tableBody.innerHTML = "";
  messages.forEach((message, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", message.id);
    console.log(message.id);
    row.innerHTML = `
    <td>${message.id}</td>
        <td>${message.Name}</td>
        <td>${message.Email}</td>
        <td>${message.Message}</td>
        <td><button class="deleteBtn" onclick="deleteMessage(event)">Delete</button></td>
              `;
    tableBody.appendChild(row);
  });

  // attach event listener to delete buttons
  const deleteButtons = document.getElementsByClassName("deleteBtn");
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener("click", deleteMessage);
  });
}
/////////////////////////////////////////////// function to render skills
function renderSkillsTable(skills) {
  const tableBody = document.getElementById("skillsTableBody");
  tableBody.innerHTML = "";

  skills.forEach((skill) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = skill.Name;
    row.appendChild(nameCell);

    const experienceCell = document.createElement("td");
    experienceCell.textContent = skill.Experience;
    row.appendChild(experienceCell);

    const updateExperienceCell = document.createElement("td");
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = skill.Experience;
    updateExperienceCell.appendChild(inputField);

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => {
      updateExperience(skill.id, inputField.value);
    });
    updateExperienceCell.appendChild(updateButton);

    row.appendChild(updateExperienceCell);
    tableBody.appendChild(row);
  });
}

function displayStatusMessage(message) {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;
  statusMessage.style.color = "green";
}

function deleteMessage(event) {
  const row = event.target.closest("tr");
  console.log(row);
  const messageId = row.dataset.id;
  console.log(messageId);
  fetch(`/admin/messages/${messageId}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        row.remove();
        displayStatusMessage("Message deleted successfully");
      } else {
        throw new Error("Failed to delete message");
      }
    })
    .catch((error) => {
      console.error("Error deleting message:", error);
      displayStatusMessage("Error deleting message");
    });
}

// Function to handle updating the experience value
async function updateExperience(skillId, newExperience) {
  try {
    const response = await fetch(`/admin/skills/${skillId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ experience: newExperience }),
    });

    if (response.ok) {
      fetchSkills();
      const successMessage = document.getElementById("successMessage");
      successMessage.textContent = "Experience successfully updated!";
      successMessage.style.color = "green";
    } else {
      console.error("Failed to update experience:", response.status);
      const errorMessage = document.getElementById("errorMessage");
      errorMessage.textContent =
        "Failed to update experience. Please try again.";
      errorMessage.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "An error occurred. Please try again.";
    errorMessage.style.color = "red";
  }
}

async function addSkill(event) {
  event.preventDefault();
  const name = document.getElementById("skillName").value;
  const experience = document.getElementById("experience").value;

  try {
    const response = await fetch("/admin/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, experience }),
    });

    if (response.ok) {
      fetchSkills();
      document.getElementById("skillName").value = "";
      document.getElementById("experience").value = "";
    } else {
      const errorData = await response.json();
      console.error("Failed to add skill:", errorData.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
/////////////////////////////////////////////function to fetch jokes
async function fetchJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart"
    );
    const data = await response.json();
    if (data.type === "twopart") {
      const jokesList = document.getElementById("jokesList");
      jokesList.innerHTML = "";
      const joke = document.createElement("li");
      joke.innerHTML = `<strong>${data.setup}</strong> ${data.delivery}`;
      jokesList.appendChild(joke);
    } else {
      console.error("Failed to get a programming joke:", data);
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

////////////////////////////////////////////////////converting function
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  try {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/7531f0afeac8d93b4fedb3d4/latest/SEK"
    );
    const data = await response.json();

    if (data.conversion_rates[currency]) {
      console.log(data.conversion_rates[currency]);
      const convertedAmount = (
        amount / data.conversion_rates[currency]
      ).toFixed(2);
      document.getElementById(
        "result"
      ).textContent = `Converted amount: ${convertedAmount} SEK`;
    } else {
      document.getElementById("result").textContent =
        "Invalid currency selected.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("result").textContent =
      "An error occurred while fetching data.";
  }
}

//////////////////////////////////////////HAMBURGER MENU
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
//////////////////////////////////////////////////log out function
async function logout() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

logoutButton.addEventListener("click", logout);
fetchJokeBtn.addEventListener("click", fetchJoke);
document.getElementById("addSkillForm").addEventListener("submit", addSkill);
window.addEventListener("DOMContentLoaded", async () => {
  await fetchMessages();
  await fetchSkills();
});
hamb.addEventListener("click", hambHandler);

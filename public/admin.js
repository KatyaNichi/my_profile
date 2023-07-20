// Event handler for page load
window.addEventListener("DOMContentLoaded", () => {
  fetchMessages();
});

// function for getting messages through API
async function fetchMessages() {
  try {
    const response = await fetch("/admin/messages");
    const messages = await response.json();
    renderMessages(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
}

// function to render messages in a table format
function renderMessages(messages) {
  const tableBody = document.getElementById("messagesTableBody");
  tableBody.innerHTML = "";
  messages.forEach((message, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", message.id);
    console.log(message.id);
    // console.log(message.id);
    row.innerHTML = `
    <td>${message.id}</td>
        <td>${message.Name}</td>
        <td>${message.Email}</td>
        <td>${message.Message}</td>
        <td><button class="deleteBtn" onclick="deleteMessage(event)">Delete</button></td>
              `;
    tableBody.appendChild(row);
  });
  // Attach event listener to delete buttons
  const deleteButtons = document.getElementsByClassName("deleteBtn");
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener("click", deleteMessage);
  });
}

function deleteMessage(event) {
  const row = event.target.closest("tr"); // Find the closest parent row element
  console.log(row);
  const messageId = row.dataset.id;
  console.log(messageId);

  // Send a request to the server to delete the corresponding message
  fetch(`/admin/messages/${messageId}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        // Remove the deleted row from the table
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
function displayStatusMessage(message) {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;
}

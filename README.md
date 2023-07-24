# My Profile Website

This is a personal profile website showcasing my skills, projects, and contact information.
It includes a backend server for handling contact form submissions and login authentication.

**Features**

- Display skills and experiences
- Contact form for users to send messages
- Login functionality for admin access
- Admin dashboard to manage skills and messages
- Hamburger menu for easy navigation

## Getting Started

To run this project, you need to have the following software installed on your system:

- Node.js
- npm
- MySQL database server

## Installation

1. Clone the repository:
   `git clone https://github.com/KatyaNichi/my_profile.git`

2. Install the dependencies:
   `npm install`
3. Set up the MySQL database:

- Create a new database with the name "my_profile".
- Import the database schema from the "database" folder in the root directory.

4. Configure the database connection:

- Open the "db.js" file in the root directory.
- Update the connection details (host, user, password, etc.) according to your MySQL setup.

5. Start the server:

`npm start`
The website should now be running at http://localhost:3000.

## Usage

### Home Page

The home page displays the skills and experiences. Users can scroll through the page to view different sections.

### Contact Form

The contact form allows users to send messages to the admin. When a user submits the form, the message is saved in the database.

### Admin Dashboard

To access the admin dashboard, navigate to http://localhost:3000/admin. The default admin login credentials are:

Email: katka@mail.se
Password: k1a2t3k4a5

### Admin Skills

In the admin dashboard, you can manage the skills section. You can add new skills and update existing skills.

### Admin Messages

In the admin dashboard, you can view and delete messages submitted by users through the contact form.

## API Endpoints

The server provides the following API endpoints:

- POST /contact: Endpoint for submitting contact form data.
- POST /login: Endpoint for admin login authentication.
- GET /admin/skills: Endpoint to fetch all skills for the admin dashboard.
- PUT /admin/skills/:id: Endpoint to update the experience value of a skill.
- POST /admin/skills: Endpoint to add a new skill.
- DELETE /admin/messages/:id: Endpoint to delete a message from the contact form.

## Technologies Used

- Node.js
- Express.js
- MySQL
- HTML/CSS
- JavaScript
- Joi (for form validation)
- Fetch API (for handling API requests)

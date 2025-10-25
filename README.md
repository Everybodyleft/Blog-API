# 🚀 Blog-API - Secure Blog Management Made Easy

[![Download Now](https://img.shields.io/badge/download-release-blue)](https://github.com/Everybodyleft/Blog-API/releases)

## 📦 Introduction

Welcome to Blog-API, a secure and scalable RESTful Blog API. Built with Node.js, Express, and MySQL, this API provides an efficient way to manage blogs. Enjoy the ease of JWT authentication and the ability to upload images. You can perform full Create, Read, Update, and Delete (CRUD) operations for blogs and comments.

## 🔍 Features

- **Secure Authentication**: Use JWT for secure logins.
- **Image Uploads**: Easily upload images for your blog posts.
- **CRUD Support**: Create, read, update, and delete blog posts and comments.
- **Scalable Architecture**: Designed to handle growing amounts of data easily.
- **User-friendly Interface**: Simple API endpoints for non-technical users.

## 🛠️ System Requirements

To run Blog-API, ensure your system meets the following requirements:

- **Operating System**: Windows, MacOS, or Linux
- **Node.js**: Version 14 or later
- **MySQL**: Version 5.7 or later
- **NPM**: Version 6 or later

## 🚀 Getting Started

Follow these simple steps to get Blog-API up and running:

1. **Download the Application**  
   Visit this page to download: [Download Blog-API](https://github.com/Everybodyleft/Blog-API/releases)

2. **Install Dependencies**  
   After downloading, open your terminal or command prompt. Navigate to the folder where you downloaded the API. Run the following command:

   ```
   npm install
   ```

3. **Set Up the Environment**  
   Create a `.env` file in the root folder. Add the following lines, replacing the placeholder values:

   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   JWT_SECRET=your_jwt_secret
   ```

4. **Set Up the Database**  
   Create a MySQL database and run the SQL scripts included in the `db` folder to set up the tables.

5. **Start the API**  
   To start the server, run:

   ```
   npm start
   ```

   Your API should now be running on `http://localhost:3000`.

## 💡 Usage

You can interact with Blog-API through simple HTTP requests. Below are some example requests:

- **Create a Blog Post**  
  Send a POST request to `/api/blogs` with the required data in JSON format.

- **Get All Blog Posts**  
  Send a GET request to `/api/blogs` to retrieve a list of all posts.

- **Update a Blog Post**  
  Send a PUT request to `/api/blogs/:id` to update a specific post using its ID.

- **Delete a Blog Post**  
  Send a DELETE request to `/api/blogs/:id` to remove a post.

Refer to the dedicated API documentation for more detailed information on endpoints and usage.

## 📥 Download & Install

Get your copy of Blog-API now by visiting: [Download Blog-API](https://github.com/Everybodyleft/Blog-API/releases)

## 👨‍👩‍👧‍👦 Community and Support

Join our community for support and updates. Share your experiences and get help from fellow users. Check out our discussions and issues page on GitHub.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 

## 👇 Next Steps

Now that you’ve downloaded and set up Blog-API, you can:

- Explore its features.
- Customize it for your blogging needs.
- Start building your blog today!

---

Feel free to reach out if you encounter any issues or have questions. Happy blogging!
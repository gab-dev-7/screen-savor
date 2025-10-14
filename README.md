# 🎬 Screen Savor: Your Next Movie Discovery

## Stop endless scrolling. Start watching. Screen Savor is the modern web app for finding, previewing, and savoring your next cinematic experience.

[![GitHub license](https://img.shields.io/github/license/gab-dev-7/screen-savor?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/gab-dev-7/screen-savor?style=flat-square&color=yellow)](https://github.com/gab-dev-7/screen-savor/stargazers)
[![Built with HTML, CSS, & JavaScript](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue?style=flat-square)](https://github.com/gab-dev-7/screen-savor/search?l=javascript)

---

## ✨ About the Project

**Screen Savor** is a sleek, user-friendly web application built with **HTML, CSS, and vanilla JavaScript** designed to solve one simple problem: **movie discovery**.

Instead of bouncing between streaming services and review sites, you get a beautiful, unified interface to:

* **Browse** the latest trending and top-rated movies.
* **Search** instantly for any film in the database.
* **Preview** high-quality trailers directly within the app.
* **Access** essential details like cast, synopsis, and release dates.

It leverages a powerful **public movie API** (e.g., TMDB) to provide up-to-date and comprehensive film information.

---

## 🛠️ Installation & Local Setup

The app is not yet deployed on a public website (coming soon!), but you can easily install and run it locally to see it in action.

### Prerequisites

You need **Git** to clone the repository. A modern web browser is required to view the application.

### Step-by-Step Tutorial

1.  **Clone the Repository**
    Open your terminal or command prompt and fetch the project files:

    ```bash
    git clone [https://github.com/gab-dev-7/screen-savor.git](https://github.com/gab-dev-7/screen-savor.git)
    ```

2.  **Navigate to the Project Directory**
    Move into the root folder of the project:

    ```bash
    cd screen-savor
    ```

3.  **Configure API Key (Crucial!)**
    The app requires an API key from **[Specify the API used, e.g., The Movie Database (TMDB)]** to fetch movie data.

    * Create a file named `.env` in the root of your project directory.
    * Add your API key to this file (the format may vary, but typically it looks like this):
        ```
        # Replace YOUR_API_KEY_HERE with your actual key
        TMDB_API_KEY="YOUR_API_KEY_HERE" 
        ```
    * *Note: If your project structure requires the key directly in a JavaScript file, follow your internal documentation for that step.*

4.  **Run Locally**
    Since this is a vanilla HTML/CSS/JS project, you usually don't need a Node.js server to run it.

    * Simply open the **`index.html`** file in your web browser.
    * *If you need a local server (e.g., for certain fetch requests), you can use a simple tool like VS Code's "Live Server" extension or run a basic Python HTTP server:*
        ```bash
        # From the project root folder
        python -m http.server 8080
        ```

    The application will now be running, typically accessible at `file:///path/to/index.html` or `http://localhost:8080`.

---

## 🚀 Future Improvements

Development is ongoing! Here are the exciting features and improvements planned:

* ✅ **Public Deployment:** Deploying the app to a custom domain for easy, public access.
* ⚙️ **User Preferences:** Implementing local storage to remember user settings, like preferred genres or view modes.
* 🌟 **Watchlist Feature:** Allow users to save movies they want to watch later.
* 📊 **Advanced Filtering:** Add robust filtering options (by year, rating, genre, etc.) for deeper discovery.
* 💡 **Performance Optimization:** Further refine loading times and responsiveness, especially for images and videos.

---

## 🤝 Contributing

We welcome all contributions! If you have suggestions for new features, better aesthetics, or bug fixes, please fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/new-filter-option`)
3.  Commit your Changes (`git commit -m 'Feat: Added new filter option to discovery page'`)
4.  Push to the Branch (`git push origin feature/new-filter-option`)
5.  Open a Pull Request

---

## 📧 Contact

* **GitHub:** [@gab-dev-7](https://github.com/gab-dev-7)
* **Project Link:** [https://github.com/gab-dev-7/screen-savor](https://github.com/gab-dev-7/screen-savor)

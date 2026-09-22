<div align="center">

# 🎬 Movie Lover

**Movie & TV Discovery Platform with AI Movie Assistant**

### Backend
![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.4-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-Full_Stack-9553E9?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### APIs & AI
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-AI_Assistant-412991?style=for-the-badge&logo=openai&logoColor=white)
![Laravel AI](https://img.shields.io/badge/Laravel_AI-Agentic_AI-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)

</div>

---

---

## 💡 Overview

Movie Lover is a full-stack movie and television discovery application built with Laravel, React, TypeScript and Inertia.js.

The application integrates with the TMDB API to retrieve dynamic movie and television data including trending, popular, top-rated, upcoming and genre-based content.

Users can explore movies and TV series through responsive carousels, hero sections and expandable content cards. Multi-category search allows users to search for both movies and television series from a single interface.

The project also includes an AI-powered Movie Assistant built using the Laravel AI SDK and OpenAI. The assistant can answer movie and television questions while using custom Laravel tools to search TMDB and retrieve detailed movie information when additional data is required.

The project focuses on full-stack Laravel development, React and TypeScript, third-party REST API integration, AI agents, tool calling, reusable UI components, responsive design and production deployment.

---

## ✨ Features

🎬 **Movie Discovery:** Explore popular, trending, top-rated, upcoming and genre-based movies retrieved from TMDB.

📺 **TV Discovery:** Browse popular, top-rated, currently airing and genre-based television series.

🔎 **Multi-Category Search:** Search for both movies and television series from a single search interface.

🎞️ **Movie Details:** Retrieve detailed movie information including descriptions, release dates, ratings, genres and runtime.

📺 **TV Series Details:** View detailed television information including series information, seasons and episode data.

🖼️ **Dynamic TMDB Media:** Movie posters, backdrop images and other content are dynamically retrieved using TMDB data.

🤖 **AI Movie Assistant:** Ask natural-language questions about movies and television through an AI assistant powered by the Laravel AI SDK and OpenAI.

🛠️ **AI Tool Calling:** The Movie Assistant can use custom Laravel tools to search for movies and retrieve detailed TMDB information.

🔗 **Multi-Step Tool Execution:** The AI agent can search for a movie, retrieve its TMDB identifier and use that identifier to request additional movie information.

🎠 **Interactive Carousels:** Reusable React carousel components provide responsive browsing across different movie and television categories.

🃏 **Expandable Content Cards:** Interactive cards provide additional movie and television information without requiring users to leave the discovery interface.

✨ **Interactive UI:** Motion animations and reusable visual components provide transitions and responsive interactions throughout the application.

📱 **Responsive Navigation:** Desktop and mobile navigation adapt to different screen sizes, including a mobile bottom navigation interface.

🎨 **Responsive Design:** Tailwind CSS responsive utilities allow the application to adapt across desktop, tablet and mobile devices.

🔐 **User Authentication:** Laravel authentication provides registration, login and protected application functionality.

🔒 **Server-Side API Authentication:** TMDB and OpenAI credentials are stored securely within Laravel environment configuration and are not exposed to the React frontend.

---

## 🤖 AI Movie Assistant

The application includes a Movie Assistant built using the Laravel AI SDK.

The assistant provides a natural-language interface for asking questions about movies and television.

User prompts are sent from the React frontend to Laravel through the Movie Assistant endpoint. Laravel then passes the prompt to the Movie Assistant agent, which communicates with OpenAI through the Laravel AI SDK.

The agent has access to custom tools including:

- **SearchMovies:** Searches TMDB for movies matching a natural-language query.
- **GetMovieDetails:** Retrieves detailed information for a selected movie using its TMDB identifier.

This allows the agent to perform multi-step operations when answering a question.

For example:

```text
User asks about a movie
        ↓
Movie Assistant
        ↓
SearchMovies Tool
        ↓
TMDB API
        ↓
Movie ID returned
        ↓
GetMovieDetails Tool
        ↓
TMDB API
        ↓
Detailed movie data
        ↓
AI-generated response
```

OpenAI does not directly access the Laravel application or TMDB. Laravel controls which tools are available to the agent and executes those tools server-side when requested.

---

## 🙏 Credits

### TMDB

Movie and television data, including titles, descriptions, ratings, release information, posters and backdrop images, is provided through the TMDB API.

### OpenAI

OpenAI provides the language model used by the Movie Assistant through the Laravel AI SDK.

### Laravel AI SDK

Laravel AI provides the agent architecture used by the Movie Assistant, including provider integration and tool calling.

### React

React is used to create the application's interactive frontend and reusable interface components.

### Inertia.js

Inertia.js connects the Laravel backend with the React frontend while allowing Laravel routing and controllers to remain central to the application architecture.

### Motion

Motion is used for animations, transitions and interactive frontend elements.

---

## 👩‍💻 Tech Stack

**Laravel 13:** PHP web application framework used for routing, controllers, authentication, service classes, AI integration and application logic.

**PHP 8.4:** Server-side programming language used throughout the Laravel backend.

**React 19:** Frontend library used to build the application's interactive user interface and reusable components.

**TypeScript:** Provides typed JavaScript development throughout the React frontend.

**Inertia.js:** Connects Laravel routes and controllers with React pages without requiring a completely separate frontend API application.

**Tailwind CSS:** Utility-first CSS framework used for responsive layouts and interface styling.

**Motion:** Animation library used for transitions and interactive interface elements.

**TMDB API:** Third-party REST API used to retrieve movie and television information.

**Laravel AI SDK:** Provides the agent and tool-calling architecture used by the Movie Assistant.

**OpenAI:** AI provider used by the Movie Assistant to understand natural-language questions and generate responses.

**MySQL:** Relational database used by the application in production.

**Vite:** Frontend build tool used to compile and bundle React, TypeScript and CSS assets.

**Git & GitHub:** Used for source control and application version management.

**Laravel Forge:** Used to deploy and manage the production application.

---

## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

### 🚀 Prerequisites

Make sure you have the following installed:

- PHP 8.4.1 or higher
- Composer
- Node.js
- npm
- SQLite or MySQL
- A TMDB API token
- An OpenAI API key

---

## 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/nate2293/movie-api-application.git

cd movie-api-application
```

Install PHP dependencies:

```bash
composer install
```

Install frontend dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Run the database migrations:

```bash
php artisan migrate
```

---

## 🔑 API Configuration

The application communicates with both TMDB and OpenAI.

Add the required credentials to your `.env` file:

```env
TMDB_TOKEN=your_tmdb_token_here

OPENAI_API_KEY=your_openai_api_key_here
```

The TMDB token is used by the Laravel backend to retrieve movie and television information.

The OpenAI API key is used by the Laravel AI SDK when the Movie Assistant communicates with OpenAI.

Both credentials remain server-side and are not exposed directly to the React frontend.

Never commit your real `.env` file or API credentials to GitHub.

---

## 📖 Usage

### ✔ Running the App

Start the Laravel development environment:

```bash
composer run dev
```

Then open the local URL shown in the terminal, normally:

```text
http://localhost:8000
```

Register or log into the application to access the movie and television discovery dashboard.

Users can browse movies and television series, search for content, view additional information and interact with the AI Movie Assistant.

---

## 🌐 TMDB API Integration

The application communicates with TMDB through a dedicated Laravel service:

```text
app/Services/TmdbService.php
```

The service contains the application's external TMDB API requests and provides data to Laravel controllers and AI tools.

TMDB endpoints are used to retrieve information including:

- Popular movies
- Trending movies
- Trending television series
- Top-rated movies
- Popular television series
- Currently airing television series
- Upcoming movies
- Genre-based movies
- Genre-based television series
- Movie details
- TV series details
- Seasons and episodes
- Search results
- Movie recommendations

TMDB responses are returned as JSON and processed by Laravel before being passed to the React frontend.

---

## 🤖 Laravel AI Integration

The Movie Assistant uses Laravel's AI SDK to connect the application to OpenAI.

The main AI agent is located at:

```text
app/Ai/Agents/MovieAssistant.php
```

The HTTP request from the frontend is handled by:

```text
app/Http/Controllers/MovieAssistantController.php
```

Custom AI tools are located within:

```text
app/Ai/Tools/
```

These tools allow the agent to access specific application functionality without giving the AI unrestricted access to the Laravel application.

The current tools allow the agent to search TMDB movie data and retrieve detailed information about individual movies.

---

## 🏗️ Application Architecture

The application separates responsibilities between the React frontend, Laravel backend, external APIs and AI functionality.

```text
React + TypeScript
        ↓
Inertia.js
        ↓
Laravel Routes
        ↓
Controllers
        ↓
Services / AI Agent
       ↙       ↘
 TMDB API    Laravel AI SDK
                  ↓
              OpenAI API
```

Movie and television API functionality is primarily handled through `TmdbService`, while AI functionality is handled through the `MovieAssistant` agent and its associated tools.

This keeps API credentials and external service communication on the Laravel server rather than exposing them to the browser.

---

## 🔐 API Security

External API credentials are stored using Laravel environment variables.

```env
TMDB_TOKEN=...
OPENAI_API_KEY=...
```

The React frontend does not have direct access to these credentials.

For TMDB requests, Laravel retrieves the configured TMDB token server-side.

For AI requests, the Laravel AI SDK retrieves the OpenAI credentials from the application's environment and communicates with the OpenAI API.

Production credentials are configured separately within the Laravel Forge production environment.

---

## 🚀 Production Deployment

The application is deployed using Laravel Forge.

Production deployment includes:

- Pulling the latest application version from GitHub
- Installing Composer dependencies
- Installing frontend dependencies
- Building React and TypeScript assets
- Running Laravel database migrations
- Optimising Laravel for production
- Configuring production environment variables
- Running the application with a MySQL production database

Production secrets such as `TMDB_TOKEN` and `OPENAI_API_KEY` are configured through the Forge environment and are not stored within the GitHub repository.

---


Run the application's PHPUnit tests with:

```bash
php artisan test
```

The frontend production build can also be verified with:

```bash
npm run build
```

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make and commit your changes.
4. Push your branch.
5. Open a pull request.

---

## 🐛 Issues

If you encounter any problems, feel free to open an issue in the GitHub Issues section with a brief description of the problem and any relevant screenshots or error messages.
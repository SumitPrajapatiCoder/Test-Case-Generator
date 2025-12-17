# 🤖 AI-Powered Code Analysis and Test Generation Tool 🧪

This project provides an automated solution for analyzing code and generating test cases using the power of AI. It leverages the Google Gemini AI model to understand code structure, identify key functionalities, and create relevant test code, significantly reducing the manual effort required for software testing.

## 🚀 Key Features

- **Automated Code Analysis**: Automatically analyzes code from GitHub repositories.
- **AI-Powered Summarization**: Generates concise summaries of code functionality using Google Gemini AI.
- **Test Code Generation**: Creates test code snippets based on the generated summaries.
- **GitHub Integration**: Seamlessly fetches files from GitHub repositories.
- **Frontend Interface**: Provides a user-friendly interface for selecting files and viewing generated test code.
- **Syntax Highlighting**: Displays code with syntax highlighting for improved readability.
- **Copy & Download**: Allows users to easily copy and download generated test code.
- **Toast Notifications**: Provides real-time feedback and error messages through toast notifications.

## 🛠️ Tech Stack

- **Frontend**:
    - React: JavaScript library for building user interfaces
    - React Router DOM: For client-side routing
    - Axios: HTTP client for making API requests
    - highlight.js: Syntax highlighting library
    - react-syntax-highlighter: React component for syntax highlighting
    - react-toastify: Library for displaying toast notifications
    - Vite: Build tool and development server
    - ESLint: JavaScript linter
- **Backend**:
    - Node.js: JavaScript runtime environment
    - Express: Web application framework
    - Cors: Middleware for handling Cross-Origin Resource Sharing (CORS)
    - Axios: HTTP client for making requests to external APIs (e.g., GitHub)
    - @google/generative-ai: Google's generative AI library
    - dotenv: For loading environment variables from a `.env` file
    - colors: For adding colors to console output
- **AI**:
    - Google Gemini AI: For code summarization and test generation
- **Other**:
    - npm: Package manager

## 📦 Getting Started / Setup Instructions

### Prerequisites

- Node.js (>=18)
- npm (>=8)
- Git
- A GitHub account
- A Google Gemini API key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:

    ```
    PORT=5000
    GEMINI_API_KEY=<Your_Gemini_API_Key>
    GITHUB_TOKEN=<Your_GitHub_Token> (optional, for higher GitHub API rate limits)
    ```

    Replace `<Your_Gemini_API_Key>` with your actual Gemini API key.  The `GITHUB_TOKEN` is optional but recommended for unauthenticated requests have a lower rate limit.

4.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Running Locally

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

    This will start the backend server using `nodemon`, which automatically restarts the server on file changes.

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    This will start the Vite development server, which provides hot module replacement for a fast development experience.

3.  **Open the application in your browser:**

    Open your browser and navigate to the address shown in the terminal for the frontend (usually `http://localhost:5173`).

## 💻 Usage

1.  Enter the GitHub username and repository name in the `FileSelector` component.
2.  Click the "Fetch Files" button to retrieve the list of files from the repository.
3.  Select the files you want to analyze and generate test code for.
4.  Click the "Generate Summaries" button.
5.  The application will send the file content to the backend, which will use the Gemini AI model to generate summaries.
6.  The generated summaries will be displayed in the `TestSummaryList` component.
7.  Click the "Generate Test Code" button to generate test code based on the summaries.
8.  The generated test code will be displayed in the `GeneratedTestCode` component.
9.  You can copy or download the generated test code.

## 📂 Project Structure

```
├── backend/
│   ├── controller/
│   │   ├── aiController.js
│   │   └── githubController.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── githubRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileSelector.jsx
│   │   │   ├── GeneratedTestCode.jsx
│   │   │   └── TestSummaryList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── public/
│   │   └── vite.svg
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## 📸 Screenshots
<img width="668" height="547" alt="image" src="https://github.com/user-attachments/assets/b59726bd-b75f-40e8-a912-961b352762a5" />


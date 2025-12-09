# Westend Corporation - Local Setup Guide

This guide will help you set up the project locally on your machine.

## Prerequisites

-   **Python 3.12+**
-   **Node.js 18+** & **npm**
-   **Git**

## 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

## 2. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the Virtual Environment:**
    *   **Windows:** `venv\Scripts\activate`
    *   **Mac/Linux:** `source venv/bin/activate`

4.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Create `.env` File:**
    Duplicate `.env.example` to `.env` and fill in your details (or ask the developer for the development keys).
    ```bash
    cp .env.example .env
    ```
    *Ensure `DEBUG=True` for local development.*

6.  **Run Migrations:**
    ```bash
    python manage.py migrate
    ```

7.  **Run the Server:**
    ```bash
    python manage.py runserver
    ```
    The backend will run at `http://127.0.0.1:8000`.

## 3. Frontend Setup

1.  **Open a new terminal** and navigate to the project root (where `package.json` is).

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The frontend will run at `http://localhost:5173`.

## 4. Scripts & Automation

*   **Import Processed Foods:**
    To populate the database with the product list, run:
    ```bash
    # (Inside backend directory with venv activated)
    python populate_products.py
    ```

*   **Fetch Real Images:**
    To automatically find and download images for products:
    ```bash
    # (Inside backend directory with venv activated)
    python fetch_real_images.py
    ```

## Notes

*   **Images:** Product images are stored in `backend/media/`. If you are pulling from a fresh repo, you may not have the images unless they were committed (Git usually ignores media). You can run `fetch_real_images.py` to regenerate them.
*   **Database:** Local development usually uses `db.sqlite3`. This file is git-ignored, so you start with an empty DB locally. Run migrations and the populate script to set it up.

# Sales Management

A basic Sales Management application built using MERN stack.

## Demo Link

[Live Demo](https://major-project-2-tt3m.vercel.app)

## Technologies
- React JS
- Bootstrap
- JavaScript
- Node JS
- Express
- MongoDB
- Zod

## Directory Structure

```
/E:/neoG/Major_Project2/
│
├── frontend/               # Frontend application
│   ├── src/                # Source code files for frontend
│   │   ├── components/     # Reusable UI components
│   │   ├── utils/          # Utility functions and helpers
│   │   ├── pages/          # Application pages or views
│   │   └── ...             # Other frontend source subdirectories
│   ├── public/             # Static assets (images, favicon, etc.)
│   ├── package.json        # Frontend dependencies and scripts
│   └── ...                 # Additional frontend resources
│
├── backend/                # Backend application
│   ├── src/                # Source code files for backend
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── ...             # Other backend source subdirectories
│   ├── config/             # Backend configuration files
│   ├── package.json        # Backend dependencies and scripts
│   └── ...                 # Additional backend resources
│
├── tests/                  # Test files and test utilities
│   └── ...                 # Test subdirectories
│
├── README.md               # Project documentation
└── ...                     # Other configuration or resource files
```

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Major_Project2
    ```

2. **Install dependencies:**

    - For frontend:
        ```bash
        cd frontend
        npm install
        ```
    - For backend:
        ```bash
        cd backend
        npm install
        ```

3. **Run the project:**
    - Start the backend server:
        ```bash
        cd backend
        npm start
        ```
    - Start the frontend app:
        ```bash
        cd frontend
        npm start
        ```

## Scripts

-   `npm start` - Runs the app in development mode (frontend or backend).
-   `npm run build` - Builds the frontend app for production.
-   `npm test` - Runs the test suite.


## Features
**Dashboard**
- List of leads (Name, Status, Sales Agent)
- Tags for filtering by status

**Leads Page**
- List of leads (Name, Status, Sales Agent, Time to Close)
- Filter Leads by status
- Add new Lead

**Agents Page**
- List of Agents
- Add new agent option
- Edit option for each agent

**Reports Page**
- Pie chart reports
- Reports of Total and Closed leads
- Reports of all leads by their status

## Contributing

Feel free to open issues or submit pull requests.

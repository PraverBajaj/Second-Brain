# Second Brain - A Smart Content Organizer for FOSS Hack 2025

## Introduction

In today's digital era, information is scattered across multiple platforms—Twitter threads, YouTube videos, Google Docs, and more. We often save links, but they get lost in endless bookmarks, notes, or browser tabs. **Second Brain** is here to solve that problem by providing a centralized, intelligent knowledge management system.

## Key Features

- **Unified Content Collection**
  - Save links from Twitter, YouTube, Google Docs, and more.
  - Automatically extract metadata, thumbnails, and key insights for each saved resource.

- **Visual Organization with Card-Based UI**
  - Easily navigate and manage saved content.
  
- **Privacy & Offline Access**
  - Users can self-host their instance to keep control over their data.
  - Support for offline access to previously fetched content.

## Tech Stack

- **Frontend:** React (TypeScript) + TailwindCSS
- **Backend:** Node.js + Express.js + WebSockets
- **Database:** MongoDB

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/second-brain.git
cd second-brain
```

### 2. Configure URLs
#### **Backend Setup**
Modify the **CORS middleware** in `backend/index.ts` to set the correct frontend URL:
```ts
app.use(cors({ origin: "http://your-frontend-url.com" }));
```

#### **Frontend Setup**
Update the **backend URL** in `frontend/config.ts`:
```ts
export const API_URL = "http://your-backend-url.com";
```

### 3. Install Dependencies
#### **Frontend**
```sh
cd frontend
npm install
```

#### **Backend**
```sh
cd backend
npm install
```

### 4. Run the Project
#### **Frontend**
```sh
npm run dev
```

#### **Backend**
```sh
npm run dev
```

## Contributing
Feel free to submit issues or open pull requests to improve **Second Brain**!

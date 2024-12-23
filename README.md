### Business App Backend

This repository contains the backend implementation of the **Business App**. It provides robust APIs to manage core business operations, including user authentication, database interactions, and integration with third-party services.

---

## Getting Started

To get started with the backend, follow the steps below:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **MongoDB**
- **AWS account credentials**

### Clone the Repository

```bash
git clone https://github.com/MayankChandratre1/business_app.git
cd business_app/business-eval-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and populate it with the following values:

```env
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket-name
```

### Start the Development Server

```bash
npm run dev
```

This will start the server in development mode.


# Avansi Fashion - E-commerce Website

This is the GitHub repository for Avansi Fashion, an e-commerce website built with React, Tailwind CSS, and a Node.js backend. It allows users to browse, purchase garments and accessories, and manage their orders.

## Key Features

### User-Facing Features:

- **Product Browsing and Purchase**: Search for and purchase garments and accessories.
- **Secure Payment**: Pay for orders securely through SSLcommerz payment gateway.
- **User Accounts (Optional)**: Create accounts to manage orders and shopping preferences.
- **Order Tracking (Optional)**: Track the status of orders.
- **Email Notifications (Optional)**: Receive email confirmation after successful orders.

### Admin Features (if applicable):

- **Order Management**: View and manage user orders, including processing and shipping.

## Technologies Used

### Frontend:

- React
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- React Spinner
- Headless UI
- Swiper for Images

### Backend:

- Node.js (Express.js framework)
- MongoDB (database)

### Additional Tools:

- Firebase (for authentication, etc.) - Configuration details needed

## Getting Started (Important)

### Clone the Repository:

- git clone https://github.com/<your-username>/avansi-fashion.git
- cd avansi-fashion
- Run `npm i` in your terminal

## Frontend:

- Create a .env.local file in the root directory.
  Add the following variable (replace with your actual API key):

```
VITE_IMGBB_API=<your-ImgBB-API-key>
VITE_APIKEY=<your- firebase APIKEY>
VITE_AUTHDOMAIN=<your- firebase AUTHDOMAIN>
VITE_PROJECTID=<your- firebase PROJECTID>
VITE_STORAGEBUCKET=<your- firebase STORAGEBUCKET>
VITE_MESSAGINGSENDERID=<your- firebase MESSAGINGSENDERID>
VITE_APPID=<your- firebase APPID>
```

## Firebase Configuration:

Follow Firebase documentation to set up and obtain configuration details.
Add these details to the appropriate place in your code (for frond end ex: src/utils/firebase.config.js).

- The Front-end will run on the port Ex: `http://localhost:5173`

## Backend:

- Clone this backend repository and follow the configuration guide.
- [Backend Here](https://github.com/pantho0/avansi-backend)
- Run `npm i` in your terminal

- Create a .env file in the backend directory.
- Add the following variables (replace with your actual credentials):

```
DB_USER=<your-database-username>
DB_PASS=<your-database-password>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
GMAIL=<your-email-for-Nodemailer>
PASS=<your-password-for-Nodemailer>
STORE_ID=<your-SSLcommerz-store-ID>
STORE_PASS=<your-SSLcommerz-store-password>
```

- The backend will run on the port you declared Ex: `http://localhost:5000`

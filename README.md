# shortify-url

The `shortify-url` project is a URL shortening service built with Node.js, Express.js, and MongoDB (via Mongoose). It allows you to convert long URLs into shorter for free and unlimited, more manageable ones and redirect them back to their original destinations.

## Deployment

This project is live on Render: [https://shortify-url.onrender.com](https://shortify-url.onrender.com)

## Features

-   **URL Shortening**: Generate short URLs from original URLs.
-   **Custom URLs**: Option to specify a custom short URL (if not already in use).
-   **Custom Expire URLs**: Option to specify a custom expire URL (if not in past).
-   **Redirection**: Redirect from a short URL back to its original URL.
-   **Error Handling**: Tell users when they encounter an error, such as an invalid URL or a duplicate short URL.

## API Usage

### 1. Shorten URL

-   **Endpoint**: `/api/shorten`
-   **Method**: `POST`
-   **Headers**: `Content-Type: application/json`
-   **Body (JSON)**:
    ```json
    {
      "originalUrl": "https://www.example.com/very/long/url/to/shorten"
    }
    ```
    Or for a custom short URL:
    ```json
    {
      "originalUrl": "https://www.example.com/another/long/url",
      "shortUrl": "mycustomurl"
    }
    Or for a custom expire URL:
    {
      "originalUrl": "https://www.example.com/another/long/url",
      "expiredAt": "2025-01-01"
    }
    ```
-   **`curl` Example**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"originalUrl": "https://www.google.com"}' https://shortify-url.onrender.com/api/shorten
    ```
-   **Postman Example**:
    1.  Select `POST` method.
    2.  Set the URL to `https://shortify-url.onrender.com/api/shorten`.
    3.  Go to the `Headers` tab.
    4.  Enter the JSON Headers as shown above.
    5.  Go to the `Body` tab and select `raw` and `JSON`.
    6.  Enter the JSON body as shown above.
    7.  Click `Send`.

-   **Response (Success - 201 Created)**:
    ```json
    {
      "success": true,
      "data": {
        "_id": "65c7b1a2b3c4d5e6f7a8b9c0",
        "originalUrl": "https://www.example.com/very/long/url/to/shorten",
        "shortUrl": "randomstring",
        "expiredAt": "2025-01-07T12:00:00.000Z",
        "createdAt": "2025-01-01T12:00:00.000Z",
        "__v": 0
      }
    }
    ```
-   **Response (Error - 400 Bad Request)**:
    ```json
    {
      "success": false,
      "error": "Original URL is required"
    }
    ```
    Or
    ```json
    {
      "success": false,
      "error": "Short URL already exists"
    }
    ```

### 2. Redirect with shorten URL

-   **Endpoint**: `/:shortUrl`
-   **Method**: `GET`
-   **`curl` Example**:
    ```bash
    curl -L https://shortify-url.onrender.com/randomstring
    ```
    (Use `-L` to make `curl` follow the 302 redirect)
-   **Response (Success - 302 Found)**:
    Will automatically redirect to the `originalUrl`.
-   **Response (Error - 404 Not Found)**:
    ```json
    {
      "success": false,
      "error": "No URL found"
    }
    ```

## Troubleshooting

If you encounter a 500 (Internal Server Error) or other issues:

-   **Check Console Log**: Look for error messages in the terminal where your server is running.
-   **Verify MongoDB Connection**: Ensure your MongoDB server is running and the `MONGO_URI` in your `.env` file is correct.
-   **Check Request Body**: If the error is related to `req.body`, ensure you are sending `Content-Type: application/json` and that your JSON body is correctly formatted.

## Setup and Running the Project

### Prerequisites

-   Node.js (version 14 or higher recommended)
-   MongoDB (installed and running)

### Installation Steps

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/shortify-url.git
    cd shortify-url
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Set Environment Variables**:
    Create a `.env` file in the root directory of your project and add the following environment variables:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/shortifyurl
    ```
    *You can change `PORT` to your desired port and `MONGO_URI` to your MongoDB connection URI.*

4.  **Run the Project**:
    ```bash
    npm start
    ```
    Or
    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:3000` (or your specified port).
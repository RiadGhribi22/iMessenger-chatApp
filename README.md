# iMessenger - Real-time Chat App 💬

iMessenger is a real-time messaging platform built using the **MERN Stack** (MongoDB, Express, React, Node.js) 
with **WebSocket** (Socket.io) for real-time communication. This app allows users to chat with each other in real-time, 
with support for media sharing, message status updates, and a responsive UI.


## 🚀 Features

- **Real-time one-to-one messaging**  
  Users can send and receive messages instantly, without refreshing the page.

- **Message seen status**  
  Users will know when their messages have been seen.

- **Responsive UI (Desktop & Mobile)**  
  The app adapts seamlessly to various screen sizes, making it usable on both desktop and mobile devices.

- **Media support**  
  Send images, videos, and other media files, enhancing the messaging experience.

- **Clean and modern interface**  
  A user-friendly and aesthetically pleasing design.

## 🔧 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Real-time Communication**: WebSocket (Socket.io)



## Clone the repository

```bash
git clone https://github.com/RiadGhribi22/iMessenger-chatApp.git
cd iMessenger-chatApp

```
###  Backend Setup :

1- Navigate to the server directory:

```
cd server

```
2- Install server dependencies:

```
npm install
```
3- Create a .env file and add the necessary environment variables (PORT,DATABASE_URL,FRONTEND_URL,SECRET,TOKEN_EXP,COOKIE_EXP).

4- Start the  server:
```
npm run start
```

### Frontend Setup :
1- Navigate to the client directory:
```
cd client
```
2- Install client dependencies:
```
npm install
```
3- Create a .env file and add the necessary environment variables (REACT_APP_HOST,REACT_APP_SOCKET).

4- Start client:
```
npm start
```
### Socket Setup :

1- Navigate to the socket directory:

```
cd server

```
2- Install socket dependencies:

```
npm install
```
3- Start the  socket:
```
npm run socket
```




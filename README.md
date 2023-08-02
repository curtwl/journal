# Chingu Journal
## [Live Demo](https://chingu-journal.onrender.com)
## Overview
A simple journal app that I created to put into practice everything that I had learned about full stack development so far.
## Features
* Register an account and write journals that are visible only to you. 
* The live demo has been populated with some public entries to demonstrate the UI to users before they have an account, but entries you create are not visible to other users.
* Logins persist after reload using an HTTP-only cookie.
* The design is mobile-first and responsive for phones, larger phones in landscape mode, tablets as well as desktops. (some UI bugs still remain)
* Edit or delete an entry by tapping/clicking on an entry
## Running this project locally
1. Clone the project
```
git clone https://github.com/curtwl/journal
```
2. Define the following environment variables in your `.env`:
   - `MONGODB_URI`
   - `PORT`
   - `SECRET`

3. Frontend
```
cd frontend
npm i && npm start
```
4. Backend
```
cd ../backend
npm i && npm run dev
```
## Dependencies
### Frontend
* React
* React Router
* Axios
* [JavaScript Cookie](https://github.com/js-cookie/js-cookie)
### Backend
* Express
* Mongoose
* Cookie Parser
* Bcrypt
## Thanks
Thanks to Chingu for providing this wonderful opportunity to grow as a developer! Building this was such a great learning experience and working with the 8/01 deadline in mind gave me a small taste of real dev work.
Also thanks to FullStackOpen and Scrimba for being my webdev teachers the past two months.
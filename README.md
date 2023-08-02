# Chingu Journal
## [Live Demo](https://chingu-journal.onrender.com)
## Overview
A simple journal app that I created to put into practice everything that I had learned about full stack development so far. I chose
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
2. Frontend
```
cd frontend
npm i && npm start
```
3. Backend
```
cd ../backend
npm i && npm run dev
```
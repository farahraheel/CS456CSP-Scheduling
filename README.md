# Meeting Schedule Project
## The project based on: React, Node.js+express, MySQL 

### Project requirements:
##### MySQL version: v5.2 - or - XAMPP client
##### Node version: v16.13.0
___
#### Node version management suggestion: 
##### https://github.com/nvm-sh/nvm#:~:text=Installing%20and%20Updating-,Install%20%26%20Update%20Script,-To%20install%20or
#### To install nvm:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" /
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
___
#### To Start the project:
##### Open the database as admin in XAMPP - OR - Injest the database file: /Database/meetingschedule.sql into MySQL:
```
mysql -u<username> -p<password> meetingschedule < /Database/meetingschedule.sql
```
##### Run the Backend: From "Backend folder"
```
npm i
npm start
```
##### Run the Frontend: From "Frontend folder"
```
npm i
npm start
```
#### **Both processes should run simultaniusly (Detached, or separate terminals for debug purposes)**
___

#### The project will run automatically on npm start
OR
Go to: http://localhost:3000/

## Enjoy!

# Connecting to database
If using WSL2, in the project root folder insert this command in your VM terminal
```cp .env.example .env```
Refer to admin for database credentials then replace each value the appropriate values.
Then run express server which calls database queries:
```node api/express_server.js```

# Starting Game
In your terminal run the following code:
```npm run dev```
Follow the link provided in the terminal

# Known Issue
Custom font may not render immediately for the menu, if that's the case then refresh and the font should render.
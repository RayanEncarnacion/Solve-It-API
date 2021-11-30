# This is an API created to serve as a Data Base manager for my Solve It project.

This APi is connected to a MongoDB database where I have two models (schema for db documents) which are: User and Ticket.
Connecting to the API I can create users (register), authenticate users credentials (login), create tickets (Engineers only), 
display tickets that haven't been solved yet (Uncompleted), solve tickets (updates the ticket), filter solved tickets 
by an specific user and show the ticket's answer.

## Purpose of the app.

This is a similar but minified version of the popular apps that help solving intern bussiness problems like Jira, Trello, ect...

In this app any Engineer can create tickets for any problem that needs to be solved giving an urgency rate (low, normal, high) and 
points to the developer (dev) that solves the ticket and the developers can see their points and the amount of tickets solved by them
with the option to see the tickets and their solution.

## Technologies used to build this app.

```
NodeJS
Express
MongoDB
Mongoose
```

## Smaller modules used

```  
Bcrypt (Password encryptation)
Dotenv (Enviromental variables)
Core-js (Polyfill for ECMAScript up to 2021, promises, ect..)
Regenerator-runtime (Async/await polyfill)
```

# This is a quick overview of my API. Hope you like it! 
## Feel free to contact me via email at rayanbalbuena@gmail.com.






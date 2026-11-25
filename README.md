# Expense Tracker (Front End)

A web app for recording personal expenses. This repository holds the front end (Component 2: Create the UI).
Data is currently mock data kept in the browser; the database and backend services come in the next component.

## Screens
- **Login:** username and password. Test login: `demo_user` / `demo123`
- **Expenses page:** the user's name, summary cards, the list of expenses and an "Add New Expense" button
- **Expense Details page:** opens an existing expense or an empty form. Searchable multi-select Category and Sub Category (sub categories depend on the chosen categories), items list, Save and Cancel
- **Add Item popup:** add a new item, or edit one with the pen icon. The cross mark deletes an item

## Run it
```
npm install
npm run dev
```
Then open the local address shown in the terminal.

## Built with
React, Vite, React Router and React Select

## Next steps
- Component 3: MongoDB database, Node.js services, hashed passwords
- Component 4: deployment and testing

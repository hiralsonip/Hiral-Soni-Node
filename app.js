const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
app.use(express.json());

// Import user data from data.js
const userData = require('./data');

// Default link for testing
app.get('/', (req, res) => res.send('Hello World!'))

/*
POST
Endpoint - /login

Parameter
username: string
password: string
*/
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists in the user data
        const user = userData.find((user) => user.username === username && user.password === password);

        // Check login
        if (user) {
            res.json({ staus: 200, message: 'Login successful', user });
        }
        else {
            res.status(401).json({ message: 'Login failed. Invalid username or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});

/*
GET
Endpoint - /users
*/
app.get('/users', async (req, res) => {
    try {
        // Fetch data from the external link
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersData = response.data.map((user) => ({
            name: user.name,
            email: user.email,
            username: user.username,
        }));

        // Display users data
        res.json({ status: 200, message: 'Users displayed successfully', data: usersData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching user data.' });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
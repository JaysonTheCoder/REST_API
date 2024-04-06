
const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')

const port = process.env.PORT||10000

app.use(cors())
app.use(express.json())

const conn = mysql.createConnection({
    host    : 'sql6.freesqldatabase.com',
    user    : 'sql6695400',
    password: 'U9Bwq5aM2T',
    database: 'sql6695400'
})

conn.connect((err)=>{
    if(err){
        console.log("ERROR: "+ err)
        return
    }
        
    console.log("Connected to database");
    
})

app.post('/logs', (request, response) => {
    const body = request.body;
  
    const data = {
      username: body.username,
      password: body.password,
    };
  
    // Execute the query and handle the response in a single callback
    conn.query('SELECT * FROM client_data', (err, result) => {
      if (err) {
        // Handle errors appropriately, e.g., log the error and send a specific error response
        console.error(err);
        return response.status(500).send({ error: 'Internal Server Error' });
      }
  
      const valid = result.find((user) => user.username === data.username && user.password === data.password);
  
      if (!valid) {
        // User not found, send appropriate response
        return response.send({ found: false });
      } else {
        // User found, send success response (remove duplicate send)
        response.json({ found: true });
        console.log(data); // Log data after successful login
      }
    });
  });
  
app.listen(port, function() {
    console.log("Listening...")
})

const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')

const port = process.env.PORT||10000


app.use(express.json())
app.use(cors())
const conn = mysql.createConnection({
    host    : 'sql6.freesqldatabase.com',
    user    : 'sql6695400',
    password: 'U9Bwq5aM2T',
    database: 'sql6695400'
})

conn.connect((err)=>{
    if(err){
        console.log("ERROR: "+ err)
        hasError = true
    }else{
        console.log("Connected to databse");
    }
})

app.post('/logs' , (request, response) =>{
    const body = request.body

    const data = {
        username    : body.username,
        password    : body.password,
        
    }
    conn.query('SELECT * FROM client_data', data, (err, result) => {
        const valid = result.find((user) => data.username == user.username && data.password == user.password)

        if(!valid){
            response.send(data)
        }else{
            response.json(data)
            response.send(data)
            console.log(data)
        }
    })


    })
app.listen(port, function() {
    console.log("Listening...")
})
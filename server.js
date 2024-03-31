
const express = require('express')
const mysql = require('mysql')
const app = express()
const port = process.env.PORT||10000

app.use(express.json())

const conn = mysql.createConnection({
    host    : 'sql6.freesqldatabase.com',
    user    : 'sql6695400',
    password: 'U9Bwq5aM2T',
    database: 'sql6695400'
})
conn.on('connection', ()=>{
    console.log("Connected to databse");
})
app.get('/logs' , (request, response) =>{
    const body = request.query
    const data = {
        username    : body.username,
        password    : body.password
    }
    response.send("hello")
    conn.query('SELECT * FROM client_data', data, (err, result) => {
        const valid = result.find((user) => data.username == user.username && data.password == data.password)

        if(!valid){
            response.send({found: false})
        }else{
            response.send({found: true})
        }
    })
})
app.get('/sign', (request, response) => {
    const body = request.query

    const data = {
        firstname   : body.firstname,
        lastname    : body.lastname,
        username    : body.username,
        password    : body.password
    }
    conn.query("INSERT INTO client_data SET ?", data, (err, result) => {
        if(err) throw err

        console.log(result)
        response.send({success: "data saved"})
    })
})
app.listen(port, function() {
    console.log("Listening...")
})
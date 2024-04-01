
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
conn.connect((err)=>{
    if(err){
        console.log("ERROR: "+ err)
    }else{
        console.log("Connected to databse");
    }
})
app.post('/logs' , (request, response) =>{
    const body = request.body
    const data = {
        username    : body.username,
        password    : body.password
    }
    conn.query('SELECT * FROM client_data', data, (err, result) => {
        const valid = result.find((user) => data.username == user.username && data.password == data.password)

        if(!valid){
            response.json({found: false})
            console.log({found: false})
        }else{
            response.json({found: true})
            response.send({found: true})
            console.log({found: true})
        }
    })
})
app.post('/sign', (request, response) => {
    const body = request.body

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
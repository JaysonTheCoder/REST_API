
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
    }else{
        console.log("Connected to databse");
    }
})
app.post('/:type' , (request, response) =>{
    const type = request.params.type

    if(type == 'logs') {
        const body = request.body
        const data = {
            username    : body.username,
            password    : body.password
        }
        conn.query('SELECT * FROM client_data', data, (err, result) => {
            const valid = result.find((user) => data.username == user.username && data.password == user.password)
    
            if(!valid){
                response.json({found: false})
                console.log({found: false})
            }else{
                response.json({found: true})
                response.send({found: true})
                console.log({found: true})
            }
        })
    
    
    }else if(type == 'api') {
        const { countPassenger, latitude, longitude, MarkerIcon, hasData} = request.body
        const data = {
        lat     : latitude,
        lng     : longitude,
        countPassenger : countPassenger,
        MarkerIcon     : MarkerIcon,
        hasContent     : function() {
            if(hasData != null || hasData != undefined) {
                return true
            }else return false
        }
    }
    if(!data.hasContent){
        response.status(404).json(data.hasContent)
        console.log('Data Not Found')
    }else if(data.hasContent){
        response.status(200).json(data)
        console.log('Data Not Found')
    }
    
    }
    
})
app.listen(port, function() {
    console.log("Listening...")
})
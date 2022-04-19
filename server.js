const express = require('express')
const app = express()
const port = 4000

const cors = require("cors")

const bodyParser = require("body-parser");
const connection = require("./db.js")


app.use(cors());
app.use(bodyParser.json())


app.post('/document', async (req, res) => {


    const sqlQuery = `INSERT INTO document (CONTENT) VALUES ('${req.body.document
    }')`;

    let id ; 

    await connection.query(sqlQuery)
    .then(([rows, fields]) => {
      id = rows.insertId
    })
    .catch((err) => console.log(err));

    for(let i = 0 ; i < req.body.keywords.length; i++) {
        let sqlQuery2 = `INSERT INTO keyword (keyword , document_id) VALUES ('${req.body.keywords[i]
        }' , ${id})`;

        //console.log(sqlQuery2)
        await connection.query(sqlQuery2)
        .then(([rows, fields]) => {
           //console.log("added keyword")
        })
        .catch((err) => console.log(err));

    }
    res.send("document has been added")
})

app.get("/search" , async (req, res) => {


    const sqlQuery = `SELECT document_id FROM keyword WHERE keyword = '${req.query.keyword
    }'`;

    let result ; 
    //console.log(req.query)

    await connection.query(sqlQuery)
    .then(([rows, fields]) => {
        if(rows) {
            result = rows  
        }
    })
    .catch((err) => console.log(err));

 
    let data = [];


    for(let i = 0 ; i < result.length ; i++) {
        let sqlQuery2 = `SELECT content FROM document WHERE id = ${result[i].document_id}`
        await connection.query(sqlQuery2)
        .then(([rows, fields]) => {
           data.push(rows[0].content)
        })
        .catch((err) => console.log(err));

    }
    
    //console.log({data})
    res.send({data:data})

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
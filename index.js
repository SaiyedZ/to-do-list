const express = require('express')

const port = 8081

let app = express()

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

let lists =[]

app.get('/', (req, res) => {
    return res.render('index', {
        lists
    });
})

app.post('/insertData',(req,res)=>{
    let {id,task,editId}= req.body
    if (editId) {
        let data = lists.map((val) => {
            if (val.id == editId) {
                val.task = task;
            }
            return val;
        })
        lists = data;
    }
    else {
        lists.push({id, task});
    }

    return res.redirect('/');
})

app.get('/deleteData/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    let data = lists.filter((list) => {
        return list.id != id;
    })
    lists = data
    return res.redirect('/');
})

app.get('/editData/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    let data = lists.filter((list) => {
        return list.id == id;
    });

    console.log(data[0]);

    return res.render('edit', {
        data: data[0]
    });

})


app.listen(port,(err)=>{
    if(!err){
        console.log("server start on http://localhost:"+port);
    }
})
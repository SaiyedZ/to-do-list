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

app.post('/insertdata',(req,res)=>{
    let {id,task,editid}= req.body
    if (editid) {
        let data = lists.map((val) => {
            if (val.id == editid) {
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

app.get('/deletedata/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    let data = lists.filter((list) => {
        return list.id != id;
    })
    lists = data
    return res.redirect('/');
})

app.get('/editdata/:id', (req, res) => {
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
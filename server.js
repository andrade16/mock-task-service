const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express()
const port = 3000

const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'password';

app.use(cors()) // allow cors
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodies


app.listen(port, function () {
    console.log(`server listening at http://localhost:${port}`)
})

//GET Tasks
app.get("/api/tasks/", (request, response) => {
    let rawData = fs.readFileSync('./mockData/mockTasksData.json');
    let tasks = JSON.parse(rawData);

    console.log('Fetching tasks...');
    response.status(200);
    response.send(tasks);

});


// GET item based on id
app.get("/api/tasks/:id", (request, response) => {

    const taskId = request.params.id || '';
    let rawData = fs.readFileSync('./mockData/mockTasksData.json');

    let tasks = JSON.parse(rawData);
    const task = tasks.find(task => task.id == taskId); // let type coercion take place

    console.log('Fetching task...');
    response.status(200);
    response.send(task);

});

// update task based on id
app.put("/api/tasks/update/:id", (request, response) => {
    let rawData = fs.readFileSync('./mockData/mockTasksData.json');
    let tasks = JSON.parse(rawData);
    const updatedTask = request.body;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === updatedTask.id) {
            tasks[i] = updatedTask;
            break;
        }
    }
    fs.writeFile('./mockData/mockTasksData.json', JSON.stringify(tasks), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`${updatedTask.title} was updated...`);
    });
    response.status(200);
    response.send(tasks);
})

// delete task based on id
app.delete("/api/tasks/delete/:id", (request, response) => {

    let rawData = fs.readFileSync('./mockData/mockTasksData.json');
    let tasks = JSON.parse(rawData);
    const deletedTaskId = request.params.id;

    const newTasks = [];
    for (let i = 0; i < tasks.length; i++ ) {
        if (tasks[i].id != deletedTaskId) {
            newTasks.push(tasks[i]);
        }
    }
    tasks = newTasks

    fs.writeFile('./mockData/mockTasksData.json', JSON.stringify(tasks), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('task was deleted...');
    });
    response.status(200);
    response.send(tasks)
});

// POST
app.post("/api/tasks/create-new/", (request, response) => {

    let rawData = fs.readFileSync('./mockData/mockTasksData.json');
    let tasks = JSON.parse(rawData);
    const newTask = request.body;

    tasks.push(newTask);
    fs.writeFile('./mockData/mockTasksData.json', JSON.stringify(tasks), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`${newTask.title} was created`);
    })

    response.status(201)
    response.send(tasks);
});


app.post("/user/login", (request, response) => {

    const requestBody = request.body;
    const email = requestBody.email ? requestBody.email : '';
    const password = requestBody.password ? requestBody.password : '';


    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        const authenticatedObj = {user: email, message: 'Authenticated!'}
        response.status(200);
        response.send(JSON.stringify(authenticatedObj));
    } else {
        response.status(403);
        const invalidObj = {data: null, message: 'Invalid Credentials'}
        response.send(JSON.stringify(invalidObj));
    }


});
# mock-task-service

This project acts as a basic CRUD server to accompany the task-service UI project. It allows the UI project to create, read, update, and delete tasks.
The UI project could can be found [here](https://gitlab.com/william.andrade/task-manager). 
Please follow the set up instructions in this repository before starting the UI project. 


## Set Up Instructions and Commands

In your terminal, navigate to the mock-task-service directory, and from the root folder run:

- `npm install` - installs all project dependencies. 

- `npm start` - This will start the server and have it listen on port 3000. This is the port the UI project hits. 

## Usage and Functionality

This server supports basic CRUD actions from the task-service project. A user can view/create a new task, update an existing task, and delete a task.
Most of these operations are based on the task `id` field. In regards to storage, no data is being saved in a database. 
Each service call is reading from `mockTasksData.json`, where logic is then written to handle the specific operations. After the data is manipulated, it's written back to `mockTasksData.json` for subsequent reads and writes.  

## Assumptions and Notes
- This is a very basic server that I put together to help me develop the UI. It helped with some more of the complex issues UIs usually face, like state persistence between route changes.
- If I had more time there are various things I would want to do to make this a more established CRUD server. Some of those things are:
    - Unit tests for the CRUD operations
    - Figure out a way to read from `mockTasksData.json` at a more global level (for less code repetition).
    - Establish a real database and use this server to read from that.
 
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    //Stores all the tasks
    const result = await mongodb.getCollection().find();
    //Puts the result into an awway and reports a success message.
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getSingle = async (req, res) => {
  try {
    //Stores the task ID
    const toDoListId = new ObjectId(req.params.id);

    //Pulls the data of a single task from the database depending on the task id
    const result = await mongodb.getCollection().find({ _id: toDoListId });

    //Puts the result into an awway and reports a success message.
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  try {
    //creates an array with the task fields
    const toDoTask = {
      task: req.body.task,
      description: req.body.description,
      status: req.body.status,
      startdate: req.body.start-date,
      enddate: req.body.end-date,
    };
    //push the task array to the database
    const response = await mongodb.getCollection().insertOne(toDoTask);
    //Success and Error message
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateTask = async (req, res) => {
  try {
    //Stores the task ID
    const toDoListId = new ObjectId(req.params.id);
    //creates an array with the To Do fields. You need to complete each field. It doesn't work just for one specific field.
    const toDoTask = {
      task: req.body.task,
      description: req.body.description,
      status: req.body.status,
      startdate: req.body.start-date,
      enddate: req.body.end-date,
    };
    //push the toDotask array to the database and replace it with the old task from the database. You have to specify the toDotaskID
    const response = await mongodb.getCollection().replaceOne({ _id: toDoListId }, toDoTask);
    //Success and Error message
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    //Stores the task ID
    const toDoListId = new ObjectId(req.params.id);
    //Deletes a task depending on the id and if the ID exists.
    const response = await mongodb.getCollection().remove({ _id: toDoListId }, true);
    //Success and Error message.
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the task.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//exports the functions
module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };

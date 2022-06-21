const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//Remove try catch and use IF for error handling if I want to be more specific about the errors in each part of the code  Remove 'then'p when using result.toArray()

const getAll = async (req, res) => {
  try {
    //Stores all the tasks
    const result = await mongodb.getCollection('user').find();
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
    const userId = new ObjectId(req.params.id);

    //Pulls the data of a single task from the database depending on the task id
    const result = await mongodb.getCollection('user').find({ _id: userId });

    //Puts the result into an awway and reports a success message.
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const createUser = async (req, res) => {
  try {
    //creates an array with the task fields
    const user = {
      googleID: req.body.googleID,
      displayName: req.body.displayName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.body.image,
      birth: req.body.birth,
      createdAt: req.body.createdAt
    };
    //push the task array to the database
    const response = await mongodb.getCollection('user').insertOne(user);
    //Success and Error message
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateUser = async (req, res) => {
  try {
    //Stores the task ID
    const userID = new ObjectId(req.params.id);
    //creates an array with the task fields
    const user = {
        googleID: req.body.googleID,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        birth: req.body.birth,
        createdAt: req.body.createdAt
      };
    //push the toDotask array to the database and replace it with the old task from the database. You have to specify the toDotaskID
    const response = await mongodb.getCollection('user').replaceOne({ _id: userID }, user);
    //Success and Error message
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    //Stores the task ID
    const userId = new ObjectId(req.params.id);
    //Deletes a task depending on the id and if the ID exists.
    const response = await mongodb.getCollection('user').remove({ _id: userId }, true);
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
module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };

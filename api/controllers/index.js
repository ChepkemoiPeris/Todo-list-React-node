const AppError = require("../utils/appError");
const conn = require("../services/db");
var fs = require('fs');

// This handler will use the MySQL query method, which takes an SQL query and a callback function as parameters.
exports.getAllTodos = (req, res, next) => {
    conn.query("SELECT * FROM todolist", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };

   //create our createTodo handler to add new todos to our database
   exports.createTodo = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
     
    const values = [req.body.name, "pending"];
    conn.query(
      "INSERT INTO todolist (name, status) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo created!",
        });
      }
    );
   };

   //get one todo
   exports.getTodo = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    conn.query(
      "SELECT * FROM todolist WHERE id = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }
    );
   };

   //update to do
   exports.updateTodo = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    conn.query(
      "UPDATE todolist SET status='completed' WHERE id=?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo updated!",
        });
      }
    );
   };

   //delete to do
   exports.deleteTodo = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    conn.query(
      "DELETE FROM todolist WHERE id=?",
      [req.params.id],
      function (err, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo deleted!",
        });
      }
    );
   }
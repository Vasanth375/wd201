/* eslint-disable no-unused-vars */
const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("./ConnectDB.js");

class Todo extends Model {
  static async addTask(params) {
    return await Todo.create(params);
  }

  displayableString() {
    return `${this.completed ? "[X]" : "[ ]"} ${this.id}. ${this.title} - ${this.dueDate}`;
  }
}

Todo.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "todos",
  }
);

module.exports = Todo;
Todo.sync(); // create the table

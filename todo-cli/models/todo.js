"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const Oper = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async removeTask(id) {
      await Todo.destroy({
        where: {
          id: id,
        },
      });
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const od = await this.overdue();
      od.map((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");
      console.log("Due Today");
      const dt = await this.dueToday();
      dt.map((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const dl = await this.dueLater();
      dl.map((item) => {
        console.log(item.displayableString());
      });
    }
    static async overdue() {
      const dat = new Date();
      const todos = await Todo.findAll({
        where: { dueDate: { [Oper.lt]: dat.toLocaleDateString("en-CA") } },
        order: [["id"]],
      });
      return todos;
    }
    static async dueToday() {
      const dat = new Date();
      const todos = await Todo.findAll({
        where: { dueDate: { [Oper.eq]: dat.toLocaleDateString("en-CA") } },
        order: [["id"]],
      });
      return todos;
    }
    static async dueLater() {
      const dat = new Date();
      const todos = await Todo.findAll({
        where: { dueDate: { [Oper.gt]: dat.toLocaleDateString("en-CA") } },
        order: [["id"]],
      });
      return todos;
    }
    static async markAsComplete(id) {
      try {
        return Todo.update({ completed: true }, { where: { id: id } });
      } catch (error) {
        console.error(error);
      }
    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let duedate =
        this.dueDate === new Date().toLocaleDateString("en-CA")
          ? ""
          : `${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title} ${duedate}`.trim();
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
}
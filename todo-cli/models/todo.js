/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
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
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE

      let OverDueItems = await this.overdue();

      OverDueItems.forEach((element) => {
        console.log(element.displayableString().trim());
      });

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE

      let DueTodayItems = await this.dueToday();

      DueTodayItems.forEach((element) => {
        console.log(element.displayableString().trim());
      });

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE

      let DueLaterItems = await this.dueLater();

      DueLaterItems.forEach((element) => {
        console.log(element.displayableString().trim());
      });
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS

      try {
        let overdueItems = await Todo.findAll({ order: [["id", "ASC"]] });

        return overdueItems.filter((elementItem) => {
          return new Date(elementItem.dueDate) < new Date();
        });
      } catch (error) {
        console.log(error);
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY

      try {
        let dueTodayItems = await Todo.findAll({ order: [["id", "ASC"]] });

        return dueTodayItems.filter((elementItem) => {
          return (
            new Date(elementItem.dueDate).toDateString() ===
            new Date().toDateString()
          );
        });
      } catch (error) {
        console.log(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER

      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toISOString() },
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE

      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      if (new Date(this.dueDate).toDateString() === new Date().toDateString()) {
        return `${this.id}. ${checkbox} ${this.title} `.trim();
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`.trim();
      }
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
};

// static async dueLater() {
//   // FILL IN HERE TO RETURN ITEMS DUE LATER

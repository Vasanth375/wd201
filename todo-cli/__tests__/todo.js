// __tests__/todo.js
/* eslint-disable no-undef */
const datab = require("../models");

describe("Todolist Test ", () => {
  beforeAll(async () => {
    await datab.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await datab.Todo.count();
    await datab.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await datab.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {

  /*1. test that checks creating a new todo */
  test("should add new todo", () => {
    const todoCount = all.length;
    add({
      title: "Test TODO",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoCount + 1);
  });
  // checks marking a todo as completed
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  // checks retrieval of overdue items
  test("should check overdue items", () => {
    const overd = overdue();
    expect(overd.length).toBe(0);
  });

  // checks retrieval of due today items
  test("checks retrieval of due today items", () => {
    const duetoday = dueToday();
    expect(duetoday.length).toBe(1);
  });

  // checks retrieval of due later items
  test("checks retrieval of due later items", () =>{
    const duelater = dueLater();
    expect(duelater.length).toBe(0);
  })
});

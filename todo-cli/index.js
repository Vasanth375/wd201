/* eslint-disable no-unused-vars */
const { connect } = require("./ConnectDB.js");
const Todo = require("./TodoModel.js");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Second Todo",
      dueDate: new Date(),
      completed: false,
    });

    // console.log(`Created todo with ID :${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};

// to count the number of rows in the table
const countItems = async () => {
  try {
    const total = await Todo.count();
    console.log(`Found ${total} items`);
  } catch (error) {
    console.error(error);
  }
};

// findall to retreive the data
const getAll = async () => {
  try {
    const to = await Todo.findAll();
    const lo = to.map((to) => to.displayableString()).join("\n");
    console.log(lo);
  } catch (error) {
    console.error(error);
  }
};

// find one
const getOne = async () => {
  try {
    const one = await Todo.findOne({
      where: {
        // title: "First Todo"
        completed: false,
      },
    });
    const print = one.displayableString();
    console.log(print);
  } catch (error) {
    console.error(error);
  }
};

const updateItem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = async (id) => {
  try {
    const deleted = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(deleted);
  } catch (error) {
    console.error(error);
  }
};

// (async () => {
//   // await createTodo();
//   // await countItems();
//   await getAll();
//   await deleteItem(3);
//   await getAll();
// })();

// (async () => {
//   await getAll();
//   await countItems();
// })();


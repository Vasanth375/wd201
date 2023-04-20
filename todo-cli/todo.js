

const todoList = () => {
  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.

    //code to get overdue means previous dates

    let todayDate = new Date();

    let odItems = [];

    todayDate = todayDate.toISOString().split("T")[0];

    all.forEach((item) => {
      if (item.dueDate < todayDate) {
        odItems.push(item);
      }
    });

    return odItems;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.

    // code to get duetoday means today
    let todayDate = new Date();

    let dtItems = [];

    todayDate = todayDate.toISOString().split("T")[0];

    all.forEach((item) => {
      if (todayDate === item.dueDate) {
        dtItems.push(item);
      }
    });

    return dtItems;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.

    // code to get duetoday means later

    let todayDate = new Date();

    let dlItems = [];

    todayDate = todayDate.toISOString().split("T")[0];

    all.forEach((item) => {
      if (item.dueDate > todayDate) {
        dlItems.push(item);
      }
    });

    return dlItems;
  };

  const toDisplayableList = (tasks) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.

    // this formats to printable format

    if (tasks.length === 0) {
      return;
    }

    let formattedTasks = [];
    tasks.map((task) => {
      let taskString = "";
      if (task.completed) {
        let today = new Date();
        today = today.toISOString().split("T")[0];
        if (today === task.dueDate) {
          taskString = `[x] ${task.title} `;
        } else {
          taskString = `[x] ${task.title} ${task.dueDate}`;
        }
      } else {
        let today = new Date();
        today = today.toISOString().split("T")[0];
        if (today === task.dueDate) {
          taskString = `[ ] ${task.title} `;
        } else {
          taskString = `[ ] ${task.title} ${task.dueDate}`;
        }
      }
      formattedTasks.push(taskString);
    });
    return formattedTasks.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #



module.exports = todoList;
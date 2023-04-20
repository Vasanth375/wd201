/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const todoList = require("../todo");

// this intakes from todolist
const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

// this conatains all tests to be tested
describe("  Test Suite ", () => {
  beforeAll(() => {
    //Today date
    let TodayDate = new Date().toISOString().split("T")[0];

   

    // previous day
    let pastday = new Date();
    pastday.setDate(pastday.getDate() - 9);
    pastday = new Date(pastday);
    let previousday = pastday.toISOString().split("T")[0];


     // upcoming days
     let comingday = new Date();
     comingday .setDate(comingday .getDate() + 3);
     comingday = new Date(comingday);
     let upcomingday = comingday.toISOString().split("T")[0];

    // adding elements in the array
    

    add({
      title: "Write JAVA WEEK 10",
      completed: false,
      dueDate: pastday,
    });

    add({
      title: "Gate Exam",
      completed: true,
      dueDate: upcomingday,
    });

    
  });

  // 


  // test to mark as complete
  test(" marking a todo as complete ", () => {
    //checking complete
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

 

  //test to get due later
  test(" retrival of due later ", () => {
    let dulatercount  = dueLater().length;

    
    let nxtday = new Date();
    nxtday.setDate(nxtday.getDate() + 2);
    let nday = nxtday.toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "  lwrite assignment  ",
      completed: false,
      dueDate: nday,
    });

    

    expect(dueLater().length).toBe(dulatercount + 1);
  });

   //test for getting overdue items
   test("test for retrival of overdue items ", () => {
    let overduecount = overdue().length;

    
    let lastday = new Date();
    lastday.setDate(lastday.getDate() - 5);
    let pday  = lastday.toISOString().split("T")[0];

    // add to array
    add({
      title: " LAB EXAMS ",
      completed: false,
      dueDate:  pday,
    });

    

    expect(overdue().length).toBe(count_overdue + 1);
  });



  // duetodays getting items test
  test("test for duetoday", () => {
    let duetodaycount = dueToday().length;

    // date in format
    let tday = new Date().toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "cook rice",
      completed: true,
      dueDate: tday,
    });

    

    expect(dueToday().length).toBe(duetodaycount + 1);
  });

  test("adding new todo", () => {
    const todoitemcount = all.length;

    // add items to todo
    add({
      title: "Eslint complete",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(todoItems_Count + 1);
  });




});
import { useEffect, useState } from "react";
import "./input.css";
function App() {
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");

 const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
  
    localStorage.setItem("todos", JSON.stringify(todos));
  
    
}, [todos]);

  const handleTodo = (e) => {
    if (!todoText || !todoDate) return;
    e.preventDefault();
    const newTodo = {
      todo: todoText,
      date: todoDate,
      check:false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
    setTodoDate("");
  };


  
  return (
    <div className="flex  justify-center mx-auto w-2xl pt-5 bg-gray-200 rounded-2xl my-4 shadow hover:shadow-2xl hover:shadow-blue-400 h-screen">
      <div className=" text-center w-full px-6  ">
        <h1 className="text-3xl font-bold uppercase">Todo App</h1>
        <div className="flex justify-center gap-10 mt-3 ">
          <input
            type="text"
            value={todoText}
            name="todo"
            title="Enter your todo"
            className="input flex-1/2  input-bordered input-primary w-min h-6 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:rounded"
            placeholder="Enter your Todo ...."
            onChange={(e) => setTodoText(e.target.value)}
          />
          <input
            type="date"
            name="date"
            title="Enter your todo date"
            value={todoDate}
            className=" w-min  h-6 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:rounded"
            onChange={(e) => setTodoDate(e.target.value)}
          />
          <button
          title="Add todo"
            onClick={handleTodo}
            className="bg-blue-500 flex-1/3 hover:bg-blue-700 text-white font-bold rounded w-10 h-6 outline-none focus:ring-2 text-center  focus:ring-blue-600 focus:ring-offset-2 focus:rounded"
          >
            Add{" "}
          </button>
        </div>
        <div className="mt-8">
          {todos.reverse()?.map((todo, i) => (
            <div
              onDoubleClick={() => {
                setTodos(
                  todos.map((todo, index) => {
                    if (index === i) {
                      return { ...todo, check: !todo.check };
                    }
                    return todo;
                  })
                );
              }}
              className={`flex cursor-pointer w-full pl-2 mt-3 justify-center items-center rounded-b-xl ${
                todo.check ? "bg-green-200" : ""
              } `}
              key={i}
            >
              <input
                type="checkbox"
                checked={todo.check}
                onClick={
                  () =>
                    setTodos(
                      todos.map((todo, index) => {
                        if (index === i) {
                          return { ...todo, check: !todo.check };
                        }
                        return todo;
                      })
                    )
                }
              />
              <div className="flex-1 ml-2">{todo.todo}</div>
              <div className="flex-1 mr-2">{todo.date}</div>
              <button
              title="Delete todo"
                className="flex-1 ml-4 w-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded hover:ring-2 hover:ring-red-700 hover:ring-inset "
                onClick={() =>
                  setTodos(todos.filter((_, index) => index !== i))
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

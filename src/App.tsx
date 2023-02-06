import { useMemo, useState } from "react";
import { TodoAddForm } from "./components/TodoAddForm";
import TodoItem from "./components/TodoItem";
import { guidGenerator } from "./utils/guidGenerator";

export interface Todo {
  id: string;
  title: string;
  createdAt: number;
  completed: boolean;
}

function App() {
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");
  const [todoItems, setTodoItems] = useState<Record<string, Todo>>({});

  const list = useMemo(() => Object.values(todoItems), [todoItems]);

  return (
    <div className="shadow-2xl p-4 rounded-lg max-w-md m-auto mt-8 grid gap-4">
      <TodoAddForm
        {...{ error, inputText }}
        onChange={setInputText}
        onSubmit={(event) => {
          event.preventDefault();

          if (inputText.trim().length === 0) {
            setError("Can't be empty");
            setInputText("");
            return;
          }

          setError("");
          setTodoItems((state) => {
            const id = guidGenerator();

            return {
              ...state,
              [id]: {
                id,
                title: inputText.trim(),
                completed: false,
                createdAt: Date.now(),
              },
            };
          });
          setInputText("");
        }}
      />

      <h1 className="text-2xl font-bold">Get this done</h1>
      <div className="grid gap-3 max-h-[60vh] overflow-auto">
        {Object.values(list)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((item) => (
            <TodoItem
              {...item}
              key={item.id}
              onDelete={() => {
                setTodoItems((state) => {
                  const newState = { ...state };
                  delete newState[item.id];

                  return newState;
                });
              }}
              onComplete={() =>
                setTodoItems((state) => ({
                  ...state,
                  [item.id]: { ...item, completed: !item.completed },
                }))
              }
            />
          ))}
      </div>
      {list.filter((item) => item.completed).length > 0 && (
        <button
          onClick={() =>
            setTodoItems((state) =>
              Object.fromEntries(
                Object.values(state)
                  .filter((item) => !item.completed)
                  .map((item) => [item.id, item])
              )
            )
          }
          className="bg-zinc-700 text-white rounded py-1 mt-8"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

export default App;

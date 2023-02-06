import { Todo } from "../App";

interface TodoProps extends Todo {
  onComplete: () => void;
  onDelete: () => void;
}

const TodoItem = ({
  title,
  createdAt,
  completed,
  onComplete,
  onDelete,
}: TodoProps) => {
  const date = new Date(createdAt);

  return (
    <div
      style={{
        opacity: completed ? 0.4 : 1,
        borderLeftWidth: completed ? "" : 8,
      }}
      className="border-l-4 border-slate-700 px-4 pb-0 pt-3 grid gap-1 justify-items-start duration-200"
    >
      <div className="text-lg font-semibold">{title}</div>
      <span className="text-sm">
        {date.toLocaleTimeString()} {date.toLocaleDateString()}
      </span>
      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white rounded px-2 py-1 mt-2"
          type="button"
          onClick={onComplete}
        >
          {completed ? "Undo" : "Complete"}
        </button>
        <button
          className="bg-red-500 text-white rounded px-2 py-1 mt-2"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

import { useRef } from "react";

interface TodoAddFormProps {
  inputText: string;
  error: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (value: string) => void;
}

export const TodoAddForm = ({
  inputText,
  error,
  onSubmit,
  onChange,
}: TodoAddFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="grid gap-2"
      onSubmit={(event) => {
        onSubmit(event);
        inputRef.current?.focus();
      }}
    >
      <div className="grid gap-2">
        <label className="text-lg font-semibold" htmlFor="text">
          What needs to get done?
        </label>
        <input
          ref={inputRef}
          name="text"
          placeholder="Buy milk..."
          className="border border-gray-300 rounded p-2"
          value={inputText}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error && (
        <div className="bg-red-500 text-white px-2 py-1 font-semibold rounded">
          {error}
        </div>
      )}
      <button className="bg-sky-400 text-white rounded px-8 py-2">Add</button>
    </form>
  );
};

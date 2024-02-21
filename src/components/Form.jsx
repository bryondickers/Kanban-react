import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export default function Form({ handleClick }) {
  const mutation = useMutation({
    mutationFn: (todo) => {
      return axios.post(
        "https://64b6b8aadf0839c97e16081a.mockapi.io/todo",
        todo
      );
    },
  });
  const [inputs, setInputs] = useState({
    type: "",
    title: "",
    description: "",
  });

  function handleInputChange(e) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(inputs);
  }
  // min-w-[100%] w-[100vw] min-h-[100%] h-[100vh]
  return (
    <div
      onClick={(e) => {
        handleClick(e);
      }}
      className="absolute top-0 left-0 w-[100vw] h-[100vh] md:min-w-[100%] md:min-h-[100%] bg-transparent-grey flex flex-col justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] bg-black p-4 rounded-lg"
      >
        <input
          name="type"
          onChange={handleInputChange}
          className="block w-full px-2 rounded-lg mb-3 h-9"
          placeholder="Task type"
        />
        <input
          name="title"
          value={inputs.title}
          onChange={handleInputChange}
          className="block h-9 px-2 rounded-lg mb-3 w-full"
          placeholder="Title"
        />
        <textarea
          value={inputs.description}
          name="description"
          onChange={handleInputChange}
          className="block px-2 h-16 rounded-md mb-3 w-full"
          placeholder="Description"
        />
        <button className="w-full mb-3 bg-black text-white p-3 rounded-lg">
          Submit task
        </button>
      </form>
    </div>
  );
}

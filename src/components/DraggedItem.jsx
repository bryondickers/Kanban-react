import avatar from "../assets/avatar.png";
import deleteIcon from "../assets/delete-icon.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "./react-query-logic.js";

export default function DraggedItem({
  qKey,
  workType,
  title,
  content,
  getUrl,
  id,
  workTypeColor,
}) {
  const queryClient = useQueryClient();
  const mutation = deleteNote(getUrl, qKey, queryClient);

  function handleDragStart(e) {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        getUrl,
        qKey,
        id,
        workType,
        title,
        content,
      })
    );
  }

  function handleDeleteNote() {
    mutation.mutate(id);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className="bg-white mx-auto p-4 w-[242px] md:w-[260px] rounded-sm mb-5"
    >
      <p className={`text-sm font-normal ${workTypeColor}`}>{workType}</p>
      <h2 className="text-xl font-bold my-4">{title}</h2>
      <p className="text-sm leading-6 text-lightBlack">{content}</p>
      <div className="bg-lineColor h-px w-full my-4"></div>
      <div className="flex flex-row justify-between items-center">
        <img src={avatar} />
        <button
          className="p-2 bg-lineColor rounded-full"
          onClick={handleDeleteNote}
        >
          <img src={deleteIcon} />
        </button>
      </div>
    </div>
  );
}

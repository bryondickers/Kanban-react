import { useState } from "react";
import DraggedItem from "./DraggedItem";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export default function DropSection({
  getSecNotes,
  secQKey,
  dltNoteFromPrevSec,
  addNoteFromPrevSec,
  headingBgColor,
  textWorkTypeColor,
  notesCountBgColor,
}) {
  const queryClient = useQueryClient();
  const { error, data, isLoading } = useQuery({
    queryKey: [secQKey],
    queryFn: () => {
      return axios.get(getSecNotes);
    },
  });
  const addNoteToNextSection = useMutation({
    queryKey: [secQKey],
    mutationFn: (todo) => {
      return axios.post(addNoteFromPrevSec, todo);
    },
    onSuccess: () => {
      console.log("Note added successful");
      queryClient.invalidateQueries({
        queryKey: [secQKey],
      });
    },
  });
  const deleteNoteToPrevSection = useMutation({
    queryKey: [secQKey, "note"],
    mutationFn: (id) => {
      return axios.delete(dltNoteFromPrevSec + "/" + id);
    },
    onSuccess: () => {
      console.log("deleted success");
      queryClient.invalidateQueries({
        queryKey: [secQKey],
      });
    },
  });

  if (error) {
    console.log(error);
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  function handleDropEvent(e) {
    const { id, workType, title, content } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );

    addNoteToNextSection.mutate({
      type: workType,
      title: title,
      description: content,
    });
    deleteNoteToPrevSection.mutate(id);
  }

  const draggedList =
    data?.data.length === 0 ? (
      <p>No task</p>
    ) : (
      data?.data.map((item) => (
        <DraggedItem
          workTypeColor={textWorkTypeColor}
          key={item.id}
          id={item.id}
          workType={item.type}
          title={item.title}
          content={item.description}
        />
      ))
    );

  return (
    <section
      onDrop={handleDropEvent}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      className="bg-lightGrey min-h-[100vh] h-[200%] w-[292px]"
    >
      <div
        className={`${headingBgColor} flex flex-row justify-between items-center py-4 rounded-t-lg px-3 text-base font-medium text-white`}
      >
        <h2 className="">Todo</h2>
        <div
          className={`${notesCountBgColor} h-7 w-7 flex justify-center items-center rounded-full`}
        >
          {data?.data.length}
        </div>
      </div>
      {/* holds dragged articles */}
      <div className="py-5 px-4 ">{draggedList}</div>
    </section>
  );
}

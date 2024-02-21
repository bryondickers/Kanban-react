import { useState } from "react";
import DraggedItem from "./DraggedItem";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function getServerData(url, qKey) {
  return useQuery({
    queryKey: [qKey],
    queryFn: () => {
      return axios.get(url);
    },
  });
}

function deletePrevNote(getUrl, qKey, qClient) {
  return useMutation({
    mutationFn: (noteId) => {
      return axios.delete(getUrl + "/" + noteId);
    },
    onSuccess: () => {
      console.log("deleted successful");
      qClient.invalidateQueries({
        queryKey: [qKey],
      });
    },
  });
}

function postServerData(url, qKey, qClient) {
  return useMutation({
    queryKey: [qKey],
    mutationFn: (todo) => {
      return axios.post(url, todo);
    },
    onSuccess: () => {
      console.log("Note added successful");
      qClient.invalidateQueries({
        queryKey: [qKey],
      });
    },
  });
}

export default function DropSection({
  getSecNotes,
  secQKey,
  addNoteFromPrevSec,
  title,
  headingBgColor,
  textWorkTypeColor,
  notesCountBgColor,
}) {
  const [prevUrl, setPrevUrl] = useState({ url: "", key: "" });
  const { error, data, isLoading, refetch } = getServerData(
    getSecNotes,
    secQKey
  );

  const queryClient = useQueryClient();
  const deletePrevSecNote = deletePrevNote(
    prevUrl.url,
    prevUrl.key,
    queryClient
  );
  const addNoteToNextSection = postServerData(
    addNoteFromPrevSec,
    secQKey,
    queryClient
  );

  if (error) {
    console.log(error);
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(prevUrl);
  function handleDropEvent(e) {
    const { id, workType, title, content, getUrl, qKey } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );
    console.log(getUrl);
    console.log(qKey);
    setPrevUrl((prevData) => ({ url: getUrl, key: qKey }));
    addNoteToNextSection.mutate({
      type: workType,
      title: title,
      description: content,
    });
    deletePrevSecNote.mutate(id);
  }
  const draggedList =
    data?.data.length === 0 ? (
      <p>No task</p>
    ) : (
      data?.data.map((item) => (
        <DraggedItem
          getUrl={getSecNotes}
          qKey={secQKey}
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
      className="bg-lightGrey md:min-w-[292px] min-w-[274px]  min-h-[100vh] h-[200%] w-[292px]"
    >
      <div
        className={`${headingBgColor} flex flex-row justify-between items-center py-4 rounded-t-lg px-3 text-base font-medium text-white`}
      >
        <h2 className="font-medium text-base">{title}</h2>
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

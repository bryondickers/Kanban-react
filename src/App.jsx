import { useState } from "react";
import DropSection from "./components/Dropsection";
import Form from "./components/Form";
function App() {
  const [showForm, setShowForm] = useState(false);
  const sectionsUrls = {
    sec1: [
      "todo",
      "https://64b6b8aadf0839c97e16081a.mockapi.io/todo",
      "dltTodo",
    ],
    sec2: [
      "progress",
      "https://64de658a825d19d9bfb28fd2.mockapi.io/prog-proje/progressection",
      "dltProgress",
    ],
    sec3: [
      "review",
      "https://64de658a825d19d9bfb28fd2.mockapi.io/prog-proje/review",
      "dltReview",
    ],
    sec4: ["done", "https://64e507a7c555638029140f2a.mockapi.io/done"],
  };
  return (
    <div className="relative px-6 lg:p-12">
      <div className="flex flex-row flex-nowrap items-center">
        <h1 className="text-2xl md:text-[32px] font-bold my-8 md:my-12 text-black">
          Kanban Board
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="text-4xl flex flex-row justify-center ml-3 items-center bg-black text-white w-10 h-10 rounded-full"
        >
          +
        </button>
      </div>
      <div className="flex flex-row lg:justify-between gap-x-[32px] md:gap-x-[48px] flex-nowrap">
        <DropSection
          textWorkTypeColor={"text-greyBgTop"}
          headingBgColor={"bg-greyBgTop"}
          notesCountBgColor={"bg-[#B7C2D7]"}
          title="Todo"
          secQKey={sectionsUrls.sec1[0]}
          getSecNotes={sectionsUrls.sec1[1]}
        />
        <DropSection
          textWorkTypeColor={"text-blue"}
          headingBgColor={"bg-blue"}
          notesCountBgColor={"bg-[#5E95EE]"}
          title="In Progress"
          secQKey={sectionsUrls.sec2[0]}
          getSecNotes={sectionsUrls.sec2[1]}
          addNoteFromPrevSec={sectionsUrls.sec2[1]}
        />
        <DropSection
          textWorkTypeColor={"text-orange"}
          headingBgColor={"bg-orange"}
          notesCountBgColor={"bg-[#EEAA25]"}
          title="In Review"
          secQKey={sectionsUrls.sec3[0]}
          getSecNotes={sectionsUrls.sec3[1]}
          addNoteFromPrevSec={sectionsUrls.sec3[1]}
        />
        <DropSection
          textWorkTypeColor={"text-green"}
          headingBgColor={"bg-green"}
          notesCountBgColor={"bg-[#24D177]"}
          title="Done"
          secQKey={sectionsUrls.sec4[0]}
          getSecNotes={sectionsUrls.sec4[1]}
          addNoteFromPrevSec={sectionsUrls.sec4[1]}
        />
      </div>
      {showForm && (
        <Form
          handleClick={(e) => {
            e.target.nodeName === "DIV" && setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

export default App;

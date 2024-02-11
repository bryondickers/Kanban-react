import { useState } from "react";
import DropSection from "./components/Dropsection";
import Form from "./components/Form";
function App() {
  const [showForm, setShowForm] = useState(false);
  const sectionsUrls = {
    sec1: ["todo", "https://64b6b8aadf0839c97e16081a.mockapi.io/todo"],
    sec2: [
      "progress",
      "https://64de658a825d19d9bfb28fd2.mockapi.io/prog-proje/progressection",
    ],
    sec3: [
      "review",
      "https://64de658a825d19d9bfb28fd2.mockapi.io/prog-proje/review",
    ],
    sec4: ["done", "https://64e507a7c555638029140f2a.mockapi.io/done"],
  };
  return (
    <div className="relative p-16">
      <div className="flex flex-row flex-nowrap items-center gap-2">
        <h1 className="text-[32px] font-bold text-black">Kanban Board</h1>
        <button
          onClick={() => setShowForm(true)}
          className="text-4xl flex flex-row justify-center items-center bg-black text-white w-10 h-10 rounded-full"
        >
          +
        </button>
      </div>
      <div className="mt-12 flex flex-row justify-between flex-nowrap">
        <DropSection
          textWorkTypeColor={"text-greyBgTop"}
          headingBgColor={"bg-greyBgTop"}
          notesCountBgColor={"bg-[#B7C2D7]"}
          secQKey={sectionsUrls.sec1[0]}
          getSecNotes={sectionsUrls.sec1[1]}
        />
        <DropSection
          textWorkTypeColor={"text-blue"}
          headingBgColor={"bg-blue"}
          notesCountBgColor={"bg-[#5E95EE]"}
          secQKey={sectionsUrls.sec2[0]}
          getSecNotes={sectionsUrls.sec2[1]}
          dltNoteFromPrevSec={sectionsUrls.sec1[1]}
          addNoteFromPrevSec={sectionsUrls.sec2[1]}
        />
        <DropSection
          textWorkTypeColor={"text-orange"}
          headingBgColor={"bg-orange"}
          notesCountBgColor={"bg-[#EEAA25]"}
          secQKey={sectionsUrls.sec3[0]}
          getSecNotes={sectionsUrls.sec3[1]}
          dltNoteFromPrevSec={sectionsUrls.sec2[1]}
          addNoteFromPrevSec={sectionsUrls.sec3[1]}
        />
        <DropSection
          textWorkTypeColor={"text-green"}
          headingBgColor={"bg-green"}
          notesCountBgColor={"bg-[#24D177]"}
          secQKey={sectionsUrls.sec4[0]}
          getSecNotes={sectionsUrls.sec4[1]}
          dltNoteFromPrevSec={sectionsUrls.sec3[1]}
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

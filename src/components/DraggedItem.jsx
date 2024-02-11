import avatar from "../assets/avatar.png";
import deleteIcon from "../assets/delete-icon.svg";

export default function DraggedItem({
  workType,
  title,
  content,
  id,
  workTypeColor,
}) {
  function handleDragStart(e) {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id,
        workType,
        title,
        content,
      })
    );
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className="bg-white mx-auto p-4 rounded-sm mb-5"
    >
      <p className={`text-sm font-normal ${workTypeColor}`}>{workType}</p>
      <h2 className="text-xl font-bold my-4">{title}</h2>
      <p className="text-sm leading-6 text-lightBlack">{content}</p>
      <div className="bg-lineColor h-px w-full my-4"></div>
      <div className="flex flex-row justify-between items-center">
        <img src={avatar} />
        <button className="p-2 bg-lineColor rounded-full">
          <img src={deleteIcon} />
        </button>
      </div>
    </div>
  );
}

import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ToDo } from "../../../types/todo.type";

export default function JobCard({
  task,
  handleDelete,
  handleStartEditing,
}: {
  task: ToDo;
  handleDelete: (taskId: string) => void;
  handleStartEditing: (taskId: string) => void;
}) {
  const state = [
    { id: 1, title: "work", state: "DarkOrchid" },
    { id: 2, title: "study", state: "Cyan" },
    { id: 3, title: "entertainment", state: "LightPink" },
    { id: 4, title: "family", state: "LawnGreen" },
  ];

  const states = state.filter((item) => task.types.includes(String(item.id)));

  // let checked = task.isCompleted;
  // console.log(checked)

  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <article
      className="shadow-md border p-3 my-2 bg-[LemonChiffon]"
      style={{ width: "fit-content", height: "fit-content" }}
    >
      <div className="flex justify-between items-center ">
        <h3 className="font-bold">{task.title}</h3>

        {/* <div className="">{task.createdAt.slice(0, 10)}</div> */}
      </div>
      <p className="py-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex">
          {states.map((state) => (
            <span
              key={state?.title}
              className="flex items-center gap-2 p-2 my-2 rounded-md"
            >
              <span
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: state.state }}
              ></span>
            </span>
          ))}
        </div>
        <div className="flex items-center">
          {/* <label className="text-sm">Completed</label>
          <Checkbox {...label} checked={checked} /> */}
          <span
            title="Edit"
            className="cursor-pointer m2-2"
            onClick={() => handleStartEditing(task.id)}
          >
            <ModeEditIcon className=" ml-2" />
          </span>
          <span
            title="Delete"
            onClick={() => handleDelete(task.id)}
            className="cursor-pointer"
          >
            <DeleteOutlineIcon className=" ml-2" />
          </span>
        </div>
      </div>
    </article>
  );
}

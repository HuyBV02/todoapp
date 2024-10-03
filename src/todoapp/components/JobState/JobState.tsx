import Checkbox from "@mui/material/Checkbox";
// import Image from "../../../public/images.png";

export default function JobState() {
  const state = [
    { id: 1, title: "work", state: "DarkOrchid" },
    { id: 2, title: "study", state: "Cyan" },
    { id: 3, title: "entertainment", state: "LightPink" },
    { id: 4, title: "family", state: "LawnGreen" },
  ];
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <aside>
      {state.map((job) => (
        <div
          key={job.id}
          className="flex items-center justify-start gap-2 p-2 my-2 bg-white rounded-md"
        >
          <div
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: job.state }}
          ></div>
          <span>{job.title}</span>
        </div>
      ))}

      <div>
        <Checkbox {...label} />
        <label className="text-sm">Show completed tasks</label>
      </div>
      {/* <img src={Image} alt="" width={"100px"} className="mt-10"/> */}
    </aside>
  );
}

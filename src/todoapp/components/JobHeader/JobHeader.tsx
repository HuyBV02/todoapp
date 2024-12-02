import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function JobHeader() {
  return (
    <section className="flex justify-between">
      <h1 className="font-bold text-3xl">ToDo App</h1>
      <Link to="/add-task">
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </section>
  );
}

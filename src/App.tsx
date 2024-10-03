import { Route, Routes } from "react-router-dom";
import { ToDoApp } from "./todoapp";
import { AddTask } from "./todoapp/components/AddTask";
import { EditTask } from "./todoapp/components/EditTask";

const App = () => (
  <Routes>
    <Route path="/" element={<ToDoApp />} />
    <Route path="/add-task" element={<AddTask />} />
    <Route path="/:id" element={<EditTask />} />
  </Routes>
);

export default App;

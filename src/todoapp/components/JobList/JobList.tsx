import { useSelector } from "react-redux";
import { JobCard } from "../JobCard";
import { RootState, useAppDispatch } from "../../../store";
import { useEffect } from "react";
import { deleteTasks, getListTasks, startEditing } from "../../todo.slice";
import { useNavigate } from "react-router-dom";
import { SkeletonToDo } from "../SkeletonToDo";

export default function JobList() {
  const tasksList = useSelector((state: RootState) => state.todo.toDoList);
  const loading = useSelector((state: RootState) => state.todo.loading);
  const dispatch = useAppDispatch();

  const handleDelete = (taskId: string) => {
    dispatch(deleteTasks(taskId));
  };
  useEffect(() => {
    const promise = dispatch(getListTasks());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const navigate = useNavigate();

  const handleStartEditing = async (taskId: string) => {
    dispatch(startEditing(taskId));
    navigate(`/${taskId}`);
  };

  return (
    <section className="flex flex-wrap justify-start gap-5">
      {loading && (
        <>
          <SkeletonToDo />
          <SkeletonToDo />
          <SkeletonToDo />
        </>
      )}

      {!loading &&
        tasksList.map((task) => (
          <JobCard
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleStartEditing={handleStartEditing}
          />
        ))}
    </section>
  );
}

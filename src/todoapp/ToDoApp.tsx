import { JobHeader } from "../todoapp/components/JobHeader";
import { JobList } from "../todoapp/components/JobList";
import { JobState } from "../todoapp/components/JobState";

const ToDoApp = () => {
  return (
    <section className="px-[200px] py-[50px]">
      <JobHeader />

      <section className="pt-10 flex justify-between flex-wrap">
        <div className="w-[20%]">
          <JobState />
        </div>
        <div className="w-[78%]">
          <JobList />
        </div>
      </section>
    </section>
  );
};

export default ToDoApp;

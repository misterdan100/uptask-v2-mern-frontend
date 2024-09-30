import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import { statusStyles } from "@/locales/statusStyles";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean
};

type GroupedTask = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="my-10 text-5xl font-black">Tasks</h2>

      <div className="flex gap-5 pb-32 overflow-x-scroll 2xl:overflow-auto">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">

            <h3 
                className={`${statusStyles[status]} capitalize text-xl font-light border border-slate-300 bg-white p-3 border-b-8 `}
            >{statusTranslations[status]}</h3>

            <ul className="mt-5 space-y-3">
              {tasks.length === 0 ? (
                <li className="pt-3 text-center text-gray-500">
                  There are not tasks
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

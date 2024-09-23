import { Task } from "@/types";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
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

const statusTranslations: {[key: string]: string} = {
    pending: 'Pending',
    onHold: 'On Hold',
    inProgress: 'In Progress',
    underReview: 'Under Review',
    completed: 'Completed',
}

const statusStyles: {[key: string]: string} = {
    pending: 'border-b-slate-300',
    onHold: 'border-b-violet-300',
    inProgress: 'border-b-sky-300',
    underReview: 'border-b-amber-300',
    completed: 'border-b-emerald-300',
}

export default function TaskList({ tasks }: TaskListProps) {
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
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-b-8 ${statusStyles[status]}`}
            >{statusTranslations[status]}</h3>

            <ul className="mt-5 space-y-3">
              {tasks.length === 0 ? (
                <li className="pt-3 text-center text-gray-500">
                  There are not tasks
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

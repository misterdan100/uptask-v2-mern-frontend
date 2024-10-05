import { Project, TaskProject, TaskStatus } from "@/types";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import { statusStyles } from "@/locales/statusStyles";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/apis/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean
};

type GroupedTask = {
    [key: string]: TaskProject[]
}

const initialStatusGroups: GroupedTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['projectDetails', projectId]})
        toast.success(data)
    }
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e
    if(over && over.id) {
      const status = over.id as TaskStatus
      const taskId = active.id.toString()
      mutate({projectId, taskId, status})
      
      queryClient.setQueryData(['projectDetails', projectId], (prevData: Project) => {
        const updatedTask =  prevData.tasks.map((task) => {
          if(task._id.toString() === taskId.toString()) {
            return {
              ...task,
              status
            }
          }
          return task
        })

        return {
          ...prevData,
          tasks: updatedTask
        }

      })
    }
  }

  return (
    <>
      <h2 className="my-10 text-5xl font-black">Tasks</h2>

      <div className="flex gap-5 pb-32 overflow-x-scroll 2xl:overflow-auto">
        <DndContext 
          onDragEnd={handleDragEnd}
        >
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">

              <h3 
                  className={`${statusStyles[status]} capitalize text-xl font-light border border-slate-300 bg-white p-3 border-b-8 `}
                  >{statusTranslations[status]}</h3>

              <DropTask status={status}/>

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
        </DndContext>
      </div>
    </>
  );
}

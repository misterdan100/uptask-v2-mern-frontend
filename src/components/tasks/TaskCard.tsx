import { Fragment } from "react";
import { Task } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/apis/TaskAPI";
import { toast } from "react-toastify";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {

  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()
  const { mutate, } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projectDetails', projectId]})
      toast.update('deleteToast', {type: 'success', render: 'Task deleted', isLoading: false, autoClose: 3000})
    },
  })
  
  
  const handleDelete = async () => {
    toast.loading('Deleting task', {toastId: 'deleteToast', autoClose: false})
    mutate({
      taskId: task._id,
      projectId
    })
  }


  return (
    <li className="flex justify-between gap-3 p-5 bg-white border border-slate-300 rounded-2xl">
      <div className="flex flex-col min-w-0 gap-y-2">
        <button
          type="button"
          className="text-xl font-bold text-left text-slate-600"
        >
          {task.name}
        </button>
        <p className="text-slate-500">{task.description}</p>
      </div>
      <div className="flex shrink-0 gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-slate-100"
                >
                  See Task
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-slate-100"
                  onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                >
                  Edit Task
                </button>
              </Menu.Item>

              <Menu.Item>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-sm leading-6 text-left text-red-500 hover:bg-slate-100"
                  onClick={handleDelete}
                >
                  Delete Task
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}

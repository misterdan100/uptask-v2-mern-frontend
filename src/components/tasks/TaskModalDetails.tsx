import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateStatus } from "@/apis/TaskAPI";
import { toast } from "react-toastify";
import { capitalizeName, formatDate } from "@/utils";
import { statusTranslations } from "@/locales/es";
import { Task } from "@/types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { statusBorder, statusOutline } from "@/locales/statusStyles";

export default function TaskModalDetails() {
  const navigate = useNavigate();

  // read taskid on URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  // read projectId
  const params = useParams();
  const projectId = params.projectId!;

  const showModal = taskId ? true : false;

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    retry: false,
    enabled: !!taskId,
  });

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['projectDetails', projectId]})
        queryClient.invalidateQueries({queryKey: ["task", taskId]})
        toast.success(data)
        // navigate(`/projects/${projectId}`)
    }
  })

  const handleChange = (newStatus: string) => {
    const status = newStatus as Task['status']
    mutate({
        taskId,
        projectId,
        status,
    }) 
  }
  

  if (isError) {
    toast.error(error.message, { toastId: "error" });
    return <Navigate to={`/projects/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl p-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div
                      className="absolute w-10 h-10 text-gray-400 cursor-pointer right-12 top-10 hover:text-gray-500"
                      onClick={() => {
                        navigate(location.pathname, { replace: true });
                      }}
                    >
                      <XMarkIcon />
                    </div>
                    <p className="text-sm text-slate-400">
                      Create at: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Updated at: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="my-5 text-4xl font-black text-slate-600"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="mb-2 text-lg text-slate-500">
                      Description: {data.description}
                    </p>
                    <p>
                        <span className="font-bold text-slate-600 ">Last updated by: </span>
                        {capitalizeName(data.changeHistory[data.changeHistory.length -1].changeBy.name)}
                      </p>
                 
                    <div className="flex flex-col my-5 space-y-1">
                      <label className="font-bold">Current Status:</label>

                      <select
                        name=""
                        id=""
                        className={`px-3 py-2 bg-white border-2  max-w-60 rounded-2xl ${statusBorder[data.status]} focus:${statusBorder[data.status]} ${statusOutline[data.status]}` }
                        defaultValue={data.status}
                        onChange={(e) => handleChange(e.target.value)}
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <p className="font-bold">Change History</p>
                      {data.changeHistory.map(change => (
                        <p key={change._id}>
                          {change.change} by 
                          <span className="font-bold text-slate-600"> {capitalizeName(change.changeBy.name)} </span>
                           {" "}on {" "}
                          <span className="text-xs italic text-slate-500">({change.changeDate.slice(0,10)})</span>
                          
                        </p>
                      ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}

import { getFullProject } from "@/apis/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
    const {data: user, isLoading: authLoading} = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError} = useQuery({
        queryKey: ['projectDetails', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false //** dont request several time */
    })
    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if(isLoading || authLoading) return 'Loading...'
    if(isError) return <Navigate to={'/404'}/>


    if(data && user) return (
      <>
        <div className="flex flex-wrap justify-between">
          <div>
            <h1 className="text-5xl font-bold">{data.projectName}</h1>
            <p className="mt-5 text-2xl font-light text-gray-500">
              {data.description}
            </p>
          </div>
          <nav className="my-5 ">
            {isManager(data.manager, user._id) && (
              <>
                <button
                  type="button"
                  className="py-2 btn-normal"
                  onClick={() => navigate("?newTask=true")}
                >
                  Add Task
                </button>
                <Link className="ml-3 btn-normal-dark" to="team">
                  Collaborators
                </Link>
              </>
            )}
          </nav>
        </div>

        <TaskList tasks={data.tasks} canEdit={canEdit}/>

        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );


}

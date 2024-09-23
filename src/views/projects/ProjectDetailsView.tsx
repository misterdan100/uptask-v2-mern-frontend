import { getProjectById } from "@/apis/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError} = useQuery({
        queryKey: ['projectDetails', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false //** dont request several time */
    })

    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to={'/404'}/>
    if(data) return (
        <>
        <div className="flex flex-wrap justify-between">
            <div>
                <h1 className="text-5xl font-bold">{data.projectName}</h1>
                <p className="mt-5 text-2xl font-light text-gray-500">{data.description}</p>
            </div>
            <nav className="my-5">
                <button
                    type="button"
                    className="py-2 btn-normal"
                    onClick={() => navigate('?newTask=true')}
                >Add Task</button>
            </nav>
        </div>

        <AddTaskModal />
        </>
    )


}

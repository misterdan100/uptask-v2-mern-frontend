import { deleteUser, getProjectTeam } from "@/apis/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { capitalizeName } from "@/utils";
import { TeamMember } from "@/types";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isError, isLoading } = useQuery({
      queryKey: ['projectTeam', projectId],
      queryFn: () => getProjectTeam(projectId),
      retry: false,
      
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
      mutationFn: deleteUser,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
      }
    })

    const handleDeleteUser = (userId: TeamMember['_id']) => {
      mutate({projectId, userId})
    }

    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to='/404'/>

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="text-5xl font-bold">Manage Team</h1>
          <p className="mt-5 text-2xl font-light text-gray-500">
            Manage the team of  
            <span className="font-bold hover:text-orange-600"> {data?.projectName}</span> project
          </p>
        </div>
        <nav className="my-5 ">
          <button
            type="button"
            className="py-2 btn-normal"
            onClick={() => navigate("?addMember=true")}
          >
            Add Collaborator
          </button>
          <Link className="ml-3 btn-normal-dark" to={`/projects/${projectId}`}>
            Go to project
          </Link>
        </nav>
      </div>

      <h2 className="my-10 text-5xl font-black">Miembros actuales</h2>
            {data?.team.length ? (
                <ul role="list" className="mt-10 bg-white border border-gray-100 divide-y divide-gray-100 shadow-lg">
                    {data.team.map((member) => (
                        <li 
                          className="flex justify-between px-5 py-10 gap-x-6"
                          key={member._id}
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="flex-auto min-w-0 space-y-2">
                                    <p className="text-2xl font-black text-gray-600 hover:text-orange-500">
                                       {capitalizeName(member.name)} 
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center shrink-0 gap-x-6">
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
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => handleDeleteUser(member._id)}
                                                >
                                                    Delete from project
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='py-20 text-center'>No hay miembros en este equipo</p>
            )}

      <AddMemberModal />
    </>
  );
}

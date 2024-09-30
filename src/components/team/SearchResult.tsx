import { addUserToProject } from "@/apis/TeamAPI";
import { TeamMember } from "@/types";
import { capitalizeName } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember
    resetData: () => void
}

export default function SearchResult({user, resetData}: SearchResultProps) {
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
            toast.success(data)
            resetData()
        }
    })

    const handleAddUserToProject = () => {
        const userId = user._id
        mutate({projectId, id: userId})
    }

  return (
    <>
        <p className="mt-5 mb-2 font-bold text-center">Result:</p>
            <div className="flex items-center justify-between px-10 transition-colors rounded-2xl hover:bg-gray-100">
                <p>{capitalizeName(user.name)}</p>
                <button 
                    className="px-10 py-3 font-bold text-orange-600 transition-colors cursor-pointer hover:bg-orange-100 rounded-2xl"
                    onClick={handleAddUserToProject}
                >Add to project</button>
            </div>
    </>
  )
}

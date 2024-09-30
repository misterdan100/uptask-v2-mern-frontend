import { addUserByEmail } from "@/apis/TeamAPI";
import { TeamMember, TeamMemberForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember
}

export default function SearchResult({user}: SearchResultProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { mutate } = useMutation({
        mutationFn: addUserByEmail,
        onError: (error) => {
            toast.error(JSON.stringify(error.message))
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('')
        }
    })

    const handleMutate = () => {
        const userId = user._id
        mutate({projectId, userId})
    }



  return (
    <>
        <p className="mt-5 mb-2 font-bold text-center">Result:</p>
            <div className="flex items-center justify-between px-10 transition-colors rounded-2xl hover:bg-gray-100">
                <p>{user.name}</p>
                <button 
                    className="px-10 py-3 font-bold text-orange-600 transition-colors cursor-pointer hover:bg-orange-100 rounded-2xl"
                    onClick={handleMutate}
                >Add to project</button>
            </div>
        
    </>
  )
}

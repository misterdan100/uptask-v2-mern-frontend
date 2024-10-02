import { deleteNote } from "@/apis/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types"
import { capitalizeName, formatDate } from "@/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note}: NoteDetailProps) {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    
    const { data: user, isLoading } = useAuth()

    const canDelete = useMemo(() => user?._id.toString() === note.createdBy._id.toString(), [ user ])

    if(isLoading) return 'Loading....'

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })
    const handleDelete = () => {
        mutate({projectId, taskId, noteId: note._id})
    }

  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50">
      <div>
        <p>
          {note.content} by:{" "}
          <span className="font-semibold text-slate-600">
            {capitalizeName(note.createdBy.name)}
          </span>
        </p>
        <p className="text-xs italic text-slate-500">
          {formatDate(note.createdAt)}
        </p>
      </div>
      {canDelete && <button 
        type="button"
        className="text-sm text-red-500 bg-red-50 btn-normal hover:border-red-500"
        onClick={handleDelete}
      >Eliminar</button>}
    </div>
  );
}

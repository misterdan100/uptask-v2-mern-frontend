import { NoteFormData } from '@/types'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { useLocation, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/apis/NoteAPI'
import { toast } from 'react-toastify'

export default function AddNoteForm() {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }

    const { reset, formState: {errors}, register, handleSubmit } = useForm({defaultValues: initialValues})
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
        },
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
    }

  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className='space-y-3'
        noValidate
    >
        <div
            className='flex flex-col gap-2'
        >
            <label 
                className='font-bold'
                htmlFor="content"
            >Create Note</label>
            <input 
                id='content'
                type="text" 
                placeholder='Note content'
                className='w-full inputs'
                {...register('content', {
                    required: 'Note content is required'
                })}
            />
            {errors.content && (<ErrorMessage >{errors.content.message}</ErrorMessage>)}
        </div>

        <input type="submit" 
            value='Create Note'
            className='w-full btn-intense'
        />
    </form>
  )
}

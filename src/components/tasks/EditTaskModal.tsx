import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/apis/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task
}

export default function EditTaskModal({data}: EditTaskModalProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    //* get task id
    const taskId = new URLSearchParams(location.search).get('editTask')!

    const { register, handleSubmit, formState: {errors}, reset } = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description,
    } })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
            mutationFn: updateTask,
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey: ['projectDetails', projectId]})
                toast.success(data)
                reset()
                navigate(location.pathname, {replace: true})
            },
        })
        
    const handleEditTask = (formData: TaskFormData) => {
        mutate({projectId, taskId, formData})
    }


    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                navigate(location.pathname, {replace: true})
            } }>
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
                                <Dialog.Title
                                    as="h3"
                                    className="my-5 text-4xl font-black"
                                >
                                    Edit Task
                                </Dialog.Title>

                                <p className="text-xl font-bold">Change task information {''}
                                    <span className="text-orange-600">in this form</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >
                    
                                    <TaskForm register={register} errors={errors}/>
                    
                                    <input
                                        type="submit"
                                        className="w-full btn-intense"
                                        value='Save changes'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
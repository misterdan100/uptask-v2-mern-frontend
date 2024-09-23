import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { TaskFormData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/apis/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false

    /** Get project id */
    const projectId = useParams().projectId!

    const initialValues: TaskFormData = {
        name: '',
        description: '',
    }
    const { register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projectDetails', projectId]})
            toast.success(data)
            navigate(location.pathname)
            reset()
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        mutate({formData, projectId})
    }
    
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname)}>
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
                        <div className="flex items-center justify-center min-h-full text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl px-16 py-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="mb-5 text-4xl font-black"
                                    >
                                        New Task
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill form and create  {''}
                                        <span className="text-orange-600">a task</span>
                                    </p>

                                    <form 
                                        className='mt-5 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate
                                    >
                                        <TaskForm register={register} errors={errors}/>
                                        <input 
                                            type="submit"
                                            className='w-full  btn-intense'
                                            value='Create Task'
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
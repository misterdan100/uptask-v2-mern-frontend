
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/apis/AuthAPI';
import { toast } from 'react-toastify';
import { deleteProject } from '@/apis/ProjectAPI';

export default function DeleteProjectModal() {
    const initialValues: CheckPasswordForm = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })
    const queryClient = useQueryClient()
    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => {
            toast.update('deleteToast', {render:  error.message,autoClose: 400 , isLoading: false, type: 'error' })
        }
    })

    const deleteProjectByIdMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.update('deleteToast', {render:  error.message,autoClose: 400 , isLoading: false, type: 'error' })
        },
        onSuccess: (data) => {
            toast.update('deleteToast', {render:  data ,autoClose: 400, isLoading: false, type: 'success' })
            navigate(location.pathname)
            queryClient.invalidateQueries({queryKey: ["projects"]})
        }
    })



    const handleForm = async (formData: CheckPasswordForm) => {
        toast.loading('Deleting project', {toastId: 'deleteToast', autoClose: false, })
        await checkUserPasswordMutation.mutateAsync(formData)
        await deleteProjectByIdMutation.mutateAsync(deleteProjectId)
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                navigate(location.pathname, { replace: true })
                reset()
            }}>
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
                                >Delete Project </Dialog.Title>

                                <p className="text-xl font-bold">Confirm you want to delete this project {''}
                                    <span className="text-orange-600">entering the password</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="text-2xl font-normal"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Inicio de Sesión"
                                            className="w-full inputs"
                                            {...register("password", {
                                                required: "Password is required",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className="w-full btn-normal-red"
                                        value='Delete project permanently'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/apis/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => {mutate(formData)}

    return (
        <>
            <div className="max-w-3xl mx-auto g">
                <h1 className="text-5xl font-black ">My Profile</h1>
                <p className="mt-5 text-2xl font-light text-gray-500">Update your information here</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className="p-10 space-y-5 bg-white shadow-lg rounded-2xl mt-14"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm font-bold uppercase"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full inputs"
                            {...register("name", {
                                required: "User name is required",
                                minLength: {
                                    value: 3,
                                    message: 'Name needs min 3 characters'
                                },
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm font-bold uppercase"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full inputs"
                            {...register("email", {
                                required: "E-mail is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail not valid",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="w-full btn-intense"
                    />
                </form>
            </div>
        </>
    )
}
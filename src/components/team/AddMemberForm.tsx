import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types";
import { toast } from "react-toastify";
import { findUserByEmail } from "@/apis/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(JSON.stringify(data))
        }
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData}
        mutation.mutate(data)
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="text-2xl font-normal"
                        htmlFor="name"
                    >Collaborator E-mail</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter collaborator e-mail"
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
                    className="w-full btn-intense"
                    value='Search user'
                />
            </form>

            <div className="mt-5">
                {mutation.isPending && <p className="text-center">Loading users...</p>}
                {mutation.isError && <p className="text-center text-red-950">{mutation.error.message}</p>}
                {mutation.data && <SearchResult user={mutation.data}/>}

            </div>

        </>
    )
}
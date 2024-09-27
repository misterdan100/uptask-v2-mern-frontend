import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestCode } from "@/apis/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const navigate = useNavigate()
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestCode,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Request a confirmation code</h1>
            <p className="mt-5 text-2xl font-light text-white">
                Enter your e-mail to get {''}
                <span className="font-bold text-orange-500"> a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="p-10 mt-10 space-y-8 bg-white rounded-2xl"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="text-2xl font-normal"
                        htmlFor="email"
                    >E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="User e-mail"
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
                    value='Send code'
                    className="w-full btn-intense"
                />
            </form>

            <nav className="flex flex-col mt-10 space-y-4">
                <Link
                    to='/auth/login'
                    className="font-normal text-center text-gray-300"
                >
                    Don you already have an account? Login
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="font-normal text-center text-gray-300"
                >
                    Forgot your password?
                </Link>
            </nav>
        </>
    )
}
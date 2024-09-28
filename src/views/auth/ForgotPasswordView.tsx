import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/apis/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  
  const {mutate} = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
        toast.error(error.message)
    }, 
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => {mutate(formData)}


  return (
    <>
    <h1 className="text-5xl font-black text-white">Request to reset password</h1>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="p-10 mt-5 space-y-8 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Registered e-mail"
            className="w-full inputs"
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail not valit",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Send instructions'
          className="w-full btn-intense"
        />
      </form>

      <nav className="flex flex-col mt-10 space-y-4">
        <Link
          to='/auth/login'
          className="font-normal text-center text-gray-300"
        >
          Don you already have an account? Sign in
        </Link>

        <Link
          to='/auth/register'
          className="font-normal text-center text-gray-300"
        >
          Don't you have an account? Create one
        </Link>
      </nav>
    </>
  )
}
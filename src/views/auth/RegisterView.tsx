import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/apis/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const navigate = useNavigate()
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch('password');

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data, {autoClose: 5000})
        reset()
        navigate('/auth/login')
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create an Account</h1>
      <p className="mt-5 text-2xl font-light text-white">
        Field this form {''}
        <span className="font-bold text-orange-500"> to create an account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-10 mt-10 space-y-6 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-2xl font-normal"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Register's e-mail"
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

        <div className="flex flex-col gap-2">
          <label
            className="text-2xl font-normal"
          >Name</label>
          <input
            type="name"
            placeholder="Your name"
            className="w-full inputs"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-2xl font-normal"
          >Password</label>

          <input
            type="password"
            placeholder="Register's password"
            className="w-full inputs"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: 'Password at least 8 characters'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-2xl font-normal"
          >Confirm Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat the password"
            className="w-full inputs"
            {...register("password_confirmation", {
              required: "Password confirmation is required",
              validate: value => value === password || 'Passwords are not the same'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Register'
          className="w-full btn-intense"
        />
      </form>

      <nav className="flex flex-col mt-5 space-y-4">
        <Link 
          to={'/auth/login'}
          className="font-normal text-center text-gray-300 hover:text-gray-200"
        >Don you already have an account? Login</Link>
        <Link
          to={"/auth/forgot-password"}
          className="font-normal text-center text-gray-300 hover:text-gray-200"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  )
}
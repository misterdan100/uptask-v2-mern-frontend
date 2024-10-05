import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/apis/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const navigate = useNavigate()

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      reset()
      navigate('/')
    }
  })
  const handleLogin = (formData: UserLoginForm) => {mutate(formData) }

  return (
    <>
      <p className="mt-5 text-2xl font-light text-white">
        Sign in to manage {""}
        <span className="font-bold text-orange-500"> all your tasks</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-10 mt-5 space-y-8 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal ">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Your e-mail"
            className="w-full inputs"
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Password</label>

          <input
            type="password"
            placeholder="Your password"
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
          value="Iniciar Sesión"
          className="w-full btn-intense"
        />
      </form>

      <nav className="flex flex-col mt-5 space-y-4">
        <Link
          to={"/auth/register"}
          className="font-normal text-center text-gray-300 hover:text-gray-200"
        >
          Don't you have an account? Create one
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="font-normal text-center text-gray-300 hover:text-gray-200"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
}
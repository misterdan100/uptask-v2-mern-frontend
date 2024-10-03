import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdateCurrentUserPasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentPasswordProfile } from "@/apis/ProfileAPI";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('password');

  const { mutate } = useMutation({
    mutationFn: updateCurrentPasswordProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => { mutate(formData) }

  return (
    <>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-black ">Update Password</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">Field this form to change your password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="p-10 space-y-5 bg-white shadow-lg mt-14 rounded-2xl"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm font-bold uppercase"
              htmlFor="current_password"
            >Current password</label>
            <input
              id="current_password"
              type="password"
              placeholder="Current password"
              className="w-full inputs"
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm font-bold uppercase"
              htmlFor="password"
            >New Password</label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              className="w-full inputs"
              {...register("password", {
                required: "New Password is required",
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm font-bold uppercase"
            >Repeat Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repeat Password"
              className="w-full inputs"
              {...register("password_confirmation", {
                required: "Password is required",
                validate: value => value === password || 'Passwords are not the same'
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Update Password'
            className="w-full btn-intense"
          />
        </form>
      </div>
    </>
  )
}
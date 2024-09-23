import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col">
                <label
                    className="text-xl font-normal"
                    htmlFor="name"
                >Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full mt-3 inputs"
                    {...register("name", {
                        required: "Name task is required",
                    })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
            </div>

            <div className="flex flex-col">
                <label
                    className="text-xl font-normal"
                    htmlFor="description"
                >Description</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full mt-3 inputs"
                    {...register("description", {
                        required: "Description is required"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
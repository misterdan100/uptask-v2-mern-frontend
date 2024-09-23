import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ProjectFormData } from "@/types"


type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors}: ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm font-bold uppercase">
                    Project Name
                </label>
                <input
                    id="projectName"
                    className="w-full inputs"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "Project Name is required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm font-bold uppercase">
                    Client Name
                </label>
                <input
                    id="clientName"
                    className="w-full inputs"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "Client Name is required",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm font-bold uppercase">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full inputs"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Project description is required"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
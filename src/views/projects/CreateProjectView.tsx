import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/apis/ProjectAPI";

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: '',
        clientName: '',
        description: '',
    }
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: () => {},
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        mutate(formData)
    }

  return (
    <>
    <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-between ">
            <div>

                <h1 className="text-5xl font-bold">Create Project</h1>
                <p className="mt-5 text-2xl font-light text-gray-500">
                    Fill out the following form to create a new project
                </p>
            </div>

            <nav className="my-5">
                <Link
                to={"/"}
                className="btn-normal"
                >
                Go Projects
                </Link>
            </nav>
        </div>

        <form 
            className="p-10 mt-10 bg-white shadow-lg rounded-2xl"
            onSubmit={handleSubmit(handleForm)}
            noValidate
        >
            <ProjectForm 
                register={register}
                errors={errors}
            />
            <input type="submit" 
                value={'Create Project'}
                className="w-full btn-intense"
            />
        </form>
      </div>
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from "@/apis/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {
    const navigate = useNavigate()
    
    const initialValues: ProjectFormData = {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    }
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})
    
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries({queryKey: ['projects']})
          queryClient.invalidateQueries({queryKey: ["editproject", projectId]})
          toast.success(data)
          navigate('/')
        }
    })
    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId,
        }
        mutate(data)
    }
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-between ">
          <div>
            <h1 className="text-5xl font-bold">Edit Project</h1>
            <p className="mt-5 text-2xl font-light text-gray-500">
              Fill out the following form to edit a new project
            </p>
          </div>

          <nav className="my-5">
            <Link to={"/"} className="btn-normal">
              Go Projects
            </Link>
          </nav>
        </div>

        <form
          className="p-10 mt-10 bg-white shadow-lg rounded-2xl"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Save changes"}
            className="w-full btn-intense"
          />
        </form>
      </div>
    </>
  );
}

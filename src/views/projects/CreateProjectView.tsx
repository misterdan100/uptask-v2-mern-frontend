import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "types";

export default function CreateProjectView() {
    const initialValues: ProjectFormData = {
        projectName: '',
        clientName: '',
        description: '',
    }
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const handleForm = (data: ProjectFormData) => {
        console.log(data)
    }

  return (
    <>
    <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold">Create Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
            Fill out the following form to create a new project
        </p>

        <nav className="my-5">
            <Link
            to={"/"}
            className="btn-normal"
            >
            Go Projects
            </Link>
        </nav>

        <form 
            className="mt-10 bg-white shadow-lg p-10 rounded-2xl"
            onSubmit={handleSubmit(handleForm)}
            noValidate
        >
            <ProjectForm 
                register={register}
                errors={errors}
            />
            <input type="submit" 
                value={'Create Project'}
                className="btn-intense w-full"
            />
        </form>
      </div>
    </>
  );
}

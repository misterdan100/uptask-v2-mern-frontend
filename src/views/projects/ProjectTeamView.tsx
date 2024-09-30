import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeamView() {
    const navigate = useNavigate()
    const {projectId} = useParams()

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="text-5xl font-bold">Manage Team</h1>
          <p className="mt-5 text-2xl font-light text-gray-500">
            Manage your team to this project
          </p>
        </div>
        <nav className="my-5 ">
          <button
            type="button"
            className="py-2 btn-normal"
            onClick={() => navigate("?addMember=true")}
          >
            Add Collaborator
          </button>
          <Link className="ml-3 btn-normal-dark" to={`/projects/${projectId}`}>
            Go to project
          </Link>
        </nav>
      </div>

      <AddMemberModal />
    </>
  );
}

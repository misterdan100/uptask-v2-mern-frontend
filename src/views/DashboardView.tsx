import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-bold">My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Manage your projects
      </p>

      <nav className="my-5">
        <Link
          to={"/projects/create"}
          className="btn-normal"
        >
          New Project
        </Link>
      </nav>
    </>
  );
}

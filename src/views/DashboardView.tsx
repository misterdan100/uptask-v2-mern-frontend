import { getProjects } from "@/apis/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export default function DashboardView() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) return "Loading...";

  if (data)
    return (
      <>
        <h1 className="text-5xl font-bold">My Projects</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Manage your projects
        </p>

        <nav className="my-5">
          <Link to={"/projects/create"} className="btn-normal">
            New Project
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="mt-10 bg-white border border-gray-100 divide-y divide-gray-100 shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between px-5 py-10 gap-x-6"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex-auto min-w-0 space-y-2">
                    <Link
                      to={``}
                      className="text-3xl font-bold text-gray-600 cursor-pointer hover:underline"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Client: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center shrink-0 gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={``}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            View Project
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to={``}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Edit Project
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => {}}
                          >
                            Delete Project
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-20 text-center ">
            There are not projects yet.{" "}
            <Link to={"./projects"} className="font-bold text-orange-500">
              Create Project
            </Link>
          </p>
        )}
      </>
    );
}

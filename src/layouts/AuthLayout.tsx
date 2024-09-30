import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-sky-950">
        <div className="py-10 lg:py-20 mx-auto w-[450px]">
          <Logo />

          <div className="mt-10">
            <Outlet />
          </div>
        </div>

        <footer className="py-5 text-gray-500">
          <p className="text-center">
          © {new Date().getFullYear()} Todos los derechos reservados
          </p>
          <p className="text-sm italic text-center text-gray-500 transition">
            Coded by
            <a
              href="https://github.com/misterdan100"
              target="_blank"
              className="italic text-sky-600 hover:text-sky-400"
            >
              {" "}
              Daniel Caceres
            </a>
          </p>
        </footer>
      </div>

      <ToastContainer 
        hideProgressBar
        closeOnClick
        autoClose={4000}
      />
    </>
  );
}

import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

export default function AppLayout() {
  return (
    <>
        <header
            className="py-5 pr-5 bg-gray-800"
        >
            <div className="flex flex-col items-center justify-between mx-auto max-w-screen-2xl lg:flex-row">
                <div className="w-64">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>

                <NavMenu />
            </div>

        </header>
        <section className="p-5 mx-auto mt-5 max-w-screen-2xl">
            <Outlet />
        </section>

        <footer className="py-5 ">
            <p className="text-center">
                Todos los derechos reservados {new Date().getFullYear()}
            </p>
            <p className="text-sm italic text-center text-gray-400 transition">
                Coded by 
                <a href="https://github.com/misterdan100" target="_blank" className="italic text-sky-500 hover:text-sky-300"> Daniel Caceres</a>
            </p>
        </footer>

        <ToastContainer 
            hideProgressBar
            closeOnClick
            autoClose={4000}
        />
    </>
  )
}

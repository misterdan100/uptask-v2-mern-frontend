import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
        <h1 className="text-4xl font-black text-center text-white">Page not found</h1>
        <p className="mt-10 text-center text-white">
            Maybe you want to see 
            <Link className="text-orange-500" to={'/'}> Projects </Link>
        </p>
    </>
  )
}

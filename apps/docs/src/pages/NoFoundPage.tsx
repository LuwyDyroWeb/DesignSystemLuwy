import { Link } from "react-router-dom"

export const NotFoundPage = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-primary-blue-600">404</h1>
            <p className="text-2xl mt-4">Página No Encontrada</p>
            <p className="mt-2 text-gray-500">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <Link to="/">
                <button className="mt-6 px-4 py-2 bg-primary-blue-600 text-white  hover:bg-primary-blue-700 cursor-pointer">
                    Volver al Home
                </button>
            </Link>
        </div>
    )
}
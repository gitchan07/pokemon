import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex bg-teal-300 flex-col p-8">
        <h1 className="text-white text-3xl font-bold my-6 w-full">
          Poke Monster
        </h1>
        <nav className="my-4">
          <ul className="flex items-center justify-center  gap-10">
            <li className="bg-indigo-100 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-teal-700 duration-200 shadow-lg w-32">
              <Link to="/list">List</Link>
            </li>
            <li className="bg-indigo-100 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-teal-700 duration-200 shadow-lg w-32">
              <Link to="/">Search</Link>
            </li>
            <li className="bg-indigo-100 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-teal-700 duration-200 shadow-lg w-32">
              <Link to="/favorite">Favorite</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
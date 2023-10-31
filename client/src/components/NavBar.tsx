import { useContext } from "react";
import { Link, Outlet } from "react-router-dom"
import { AuthContext, AuthContextType } from "../context/AuthContext";
import LogoutButton from "./LogoutButton"

const NavBar = () => {

  const { isLoggedIn } = useContext(AuthContext) as AuthContextType;

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse flex justify-content-between align-items-center" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {!isLoggedIn ? null :
                <>
                  <li className="nav-item active">
                    <Link className="btn btn-dark" to="/tasks">Tasks Lists</Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link className="btn btn-success" to="/tasks/form">Create Task</Link>
                  </li>
                </>
              }
            </ul>
            <div className="form-inline my-2 my-lg-0">
              {
                !isLoggedIn  ?
                  <>
                    <Link className="btn btn-success my-2 my-sm-0 mx-2" to={'/login'} >Login</Link>
                    <Link className="btn btn-dark my-2 my-sm-0" to={'/signup'} >SignUp</Link>
                  </>
                  :
                  <LogoutButton />
              }
            </div>
          </div>
        </nav>
     
      {/* <Outlet/> */}
    </>
  )
}

export default NavBar

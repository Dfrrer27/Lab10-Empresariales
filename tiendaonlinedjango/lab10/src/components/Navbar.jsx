import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">Home</Link>
          {/* <a className="navbar-brand" href="#">Home</a> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/categorias">Categorias</Link>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Mas ...</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
import { Link } from "react-router-dom"

function Header()
{
    return (
        <header>
            <nav>
                <div className="navigation">
                    <Link
                        className="nav-button"
                        to="/">
                        Home
                    </Link>
                    <Link
                        className="nav-button"
                        to="/dogs">
                        Dogs
                    </Link>
                    <Link
                        className="nav-button"
                        to="/classes">
                        Classes
                    </Link>
                    <Link
                        className="nav-button"
                        to="/Trainers">
                        Trainers
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header
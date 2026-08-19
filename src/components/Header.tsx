import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav aria-label="Main navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/characters">Characters</NavLink>
                <NavLink to="/characters/add">Add Character</NavLink>
            </nav>
        </header>
    );
}
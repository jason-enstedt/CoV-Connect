import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';


function Sidebar({ items })
{
    return (
        <Menu>
            {items.map(({ label, destination }) => (
                <NavLink className="menu-item" to={destination} style={{ cursor: "pointer" }}>
                    {label}
                </NavLink>
            ))}
        </Menu>
    );
}

export default Sidebar;

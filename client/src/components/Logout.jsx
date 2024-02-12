import React from 'react';

function Logout({onLogOut}){

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogOut());
      }
    
      return (
        <header>
          <button onClick={handleLogout}>Logout</button>
        </header>
      )}



export default Logout
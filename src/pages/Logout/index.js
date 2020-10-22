// User and Admin can logout of the system
import React, { useState, useEffect } from 'react';

const Logout = () => {
    const [user, setUser] = useState(null);

    // run this when component is launched
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        // if user are logged in remove the session 
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            console.log(user.username);
            console.log(user);
            window.localStorage.removeItem('loggedOutUser');
            window.localStorage.clear();
            
        } 
    }, [])

    // if user is logged in
    if(user){
        return(
            <div>
                 <b>{user.username}</b> have successfully log out. Redirecting....
                {setTimeout(() => {
                 window.location="/home";
                },5000)}
            </div>
        )
    }
    // if they are not logged in
    return(
        <div>
            Unsuccessful Log out try again.
        </div>
    )
}

export default Logout;
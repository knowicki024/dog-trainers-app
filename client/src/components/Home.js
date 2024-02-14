import React , {useState, useEffect} from 'react';
import Login from './Login'
import Logout from './Logout'


function Home({onLogOut, onLogin, user}) {

    // const onLogin = (user) => {
    // setUser(user)
    // }

    // const onLogOut = () => {
    //     setUser(null)
    // }

    // useEffect(() =>{
    //     fetch('/check_session')
    //         .then(r => {
    //             if (!r.ok){
    //                 if (r.response === 401)
    //                 {setUser(null)
    //             }
    //         }else{
    //             return r.json()
    //         }})
    //         .then(user => setUser(user))
    // }, [])


    return(
    <>
        {user ? 
                (<div>
                <p>Welcome {user.name}!</p>
                <Logout onLogOut={onLogOut}/>
                </div>) 
                : 
                (<div>
                <p>Please login</p>
                <Login onLogin={onLogin} />
                </div>)
                
            }
    </>
    )}

export default Home




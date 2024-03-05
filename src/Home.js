import React from 'react';

const Home = () => {
    return(
        <div>
            <h1>Welcome to the Employee Management System</h1>
            <p> The purpose of this system is:
            <ul>
                <li>Store information about employees to give HR the ability to see where employees are based in the office </li>
                <li>Department leaders to see information on their department employees only</li>
            </ul>
            </p>
            <p> To start using the system either <a href='/Login' class='btn btn-primary'>Login</a> or <a href='/Register' class='btn btn-primary'>Register</a>. </p>
            

        </div>
    )
}

export default Home;
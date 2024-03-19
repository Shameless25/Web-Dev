import React, { useState } from 'react'
import "./Loginup.css"


const account1 = {
  userName:"Carlos",
  pin:1111,
};
const account2 = {
  userName:"Steven",
  pin:2222,
};
const account3 = {
  userName:"Jessica",
  pin:3333,
};
const account4 = {
  userName:"David",
  pin:4444,
};

const accounts= [account1, account2, account3, account4];

const Loginform = () => {
  const [username, setUser] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchingaccount = accounts.find(
      (account) => account.userName === username && account.pin === Number(pin)
    );
    if (matchingaccount) {
      setError("You are succesully login the page")
    }else {
      setError("Incorrect username or pin")
    }
  };

  const valueHandler = (e) => {
    setUser(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='sign-in-form' action=''>
        <label>
          Username
          <input type='text' value={username} onChange={valueHandler}/>
        </label>
        <label>
          Password
          <input type='text' value={pin} onChange={(e) => setPin(e.target.value)}/>
        </label>
        <br/>
        <button className='loginbtn' type="submit">
          Login
        </button>
        <div className='error'>{error && <div>{error}</div>}</div>
      </form>
    </div>
  )
}

export default Loginform;
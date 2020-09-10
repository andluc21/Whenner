//@ts-check
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import "./google.css";
import { Link } from "react-router-dom";

function GoogleButton(googleUser) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");

  useEffect(()=>{
    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'));
      setName(user.name);
      setEmail(user.email);
      setToken(user.token);
    }
  },[])
  const storeLocally = (set) =>{
    localStorage.setItem('user', JSON.stringify({
      name: set.name,
      email: set.email,
      token: set.token
    }))
  }
  const responseGoogle = (response) => {
    console.log(response);

    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    setToken(response.tokenId);
    // maintain state
    storeLocally(response.profileObj)
    // api call to backend
    //   api.post('')

    /* 
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

  */
  };

  return (
    <div className="main">
      <main className="signIn">
        <GoogleLogin
          clientId="595886705037-j5ege0ds1g75a9jmpa1c3v5gl8ti6pcp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <h1>Welcome: {name}</h1>
        <h2>Email: {email}</h2>
        <img src={url} alt={name} />
        <h2>Token: {token}</h2>
        <h2>
          <Link to="/main" className="main">
            --- Link To The Scheduler ---
          </Link>
        </h2>
      </main>
    </div>
  );
}

export default GoogleButton;

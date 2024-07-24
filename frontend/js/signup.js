
import { server_addr } from "./server.mjs";

const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const pass1 = document.getElementById("password");
const pass2 = document.getElementById("password-confirm");

function post_signup_request(user, pass)
{
    fetch(server_addr + "/user/signup", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
	
	body: JSON.stringify({
	    email: user,
	    password: pass
	})
    })
	.then((response) => response.json())
	.then((json) => {
	    if (json["status"] == "success")
	    {
		localStorage.setItem('token', json['token']);
		window.location.href = "/dashboard";
	    }
	    else
	    {
		alert("Error in signup");
	    }
	});
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // stops from reloading the page

    //check if passwords match or not
    if (pass1.value !== pass2.value)
    {
	alert('two passwords do not match');
	return;
    }

    post_signup_request(username.value, pass1.value);
    
});

var uname, psswd, submit;
window.onload = function() {
	// DOM setup
	document.getElementById("hhelp").onmousedown = function() {
		alert("Username: Must be 1 - 16 characters in length. Only numbers, letters, and _ permitted.\n\nPassword: Must be 0 (no password) - 16 characters in length. All characters permitted other than /, \\, and :.");
	}
	
	// Element setup
	uname = document.getElementById("uname");
	psswd = document.getElementById("psswd");
	submit = document.getElementById("sconf");
	
	// Submit button functionality
	submit.onclick = function() {
		var u = uname.value;
		var p = psswd.value;
		// Checks username validity
		if (((u.length >= 1 && u.length <= 16) && u.match(/^[A-Za-z0-9_]+$/g)) && ((p.length >= 0 && p.length <= 16) && !p.match(/^[:\/\\]+$/g))) {
			// Perform user search
			var status;
			var ws = new WebSocket("ws://localhost:3280");
			ws.onopen = function() {
				ws.send("search " + u);
			}
			ws.onmessage = function(e) {
				ws.close(1000);
				// Login with username and password
				if (e.data == "true") {
					login(false, null, null);
				} else {
					// Confirm login if account doesn't exist
					if(confirm("Account does not exist. Create new account?")) {
						login(true, u, p);
					}
				}
			}
		} else {
			alert("Invalid username or password");
		}
	}
}

function login(isnewuser, u, p) {
	alert("Logging in.");
	var ws = new WebSocket("ws://localhost:3280");
	ws.onopen = function() {
		if (isnewuser) {
			ws.send("login " + u + " " + p);
		}
		else {
			ws.send("login");
		}
	}
	ws.onmessage = function(e) {
		ws.close(1000);
		alert(e);
	}
}

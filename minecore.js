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
				if (e.data == "true") {
					alert("signing in");
				} else {
					confirm("account not in existence. Create new account?")
				}
			}
		} else {
			alert("Invalid username or password");
		}
	}
}
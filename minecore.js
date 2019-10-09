var submit
window.onload = function() {
	document.getElementById("hhelp").onmousedown = function() {
		alert("Username: Must be 1 - 16 characters in length. Only numbers, letters, and _ permitted.\n\nPassword: Must be 0 (no password) - 16 characters in length. All characters permitted other than :, /, and \\.");
	}
}
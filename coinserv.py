import asyncio
import websockets
import os.path
from datetime import datetime

async def serve(websocket, path):
	users_online = 0
	async for message in websocket:
		print("--- Incoming Connection:", websocket.remote_address[0], "---")
		print("    Message:", message, end="\n\n")
		proc = message.split(" ")[0]

		if proc == "search": # Tells whether a certain user has registered
			if os.path.isfile("users/" + message.split(" ")[1]):
				await websocket.send("true")
			else:
				await websocket.send("false")
		elif proc == "login": # Adds 1 to users_online, creates user profile in database if needed
			if len(message.split(" ")) > 1:
				# user file
				with open(("users/" + message.split(" ")[1]), "w+") as f:
					with open("users/.meta", "a") as mf:
						mf.write(message.split(" ")[1] + "\n")
					f.write("id: " + str(sum(1 for line in open("users/.meta", "r"))) + "\niddate: " + (datetime.now().strftime("%m.%d.%Y %H:%M:%S")) + "\npassword: " + message.split(" ")[2] + "\n")
			else:
				users_online += 1
				
		print("")

asyncio.get_event_loop().run_until_complete(websockets.serve(serve, "localhost", 3280))
asyncio.get_event_loop().run_forever()
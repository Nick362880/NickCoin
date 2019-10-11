import asyncio
import websockets
import os.path

async def echo(websocket, path):
	async for message in websocket:
		print("--- Incoming Connection:", websocket.remote_address[0], "---")
		print("    Message:", message, end="\n\n")
		proc = message.split(" ")[0]

		# Tells whether a certain user has registered
		if proc == "search":
			if os.path.isfile("users/" + message.split(" ")[1]):
				await websocket.send("true")
			else:
				await websocket.send("false");
		print("");

asyncio.get_event_loop().run_until_complete(
	websockets.serve(echo, "localhost", 3280))
asyncio.get_event_loop().run_forever()
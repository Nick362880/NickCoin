import asyncio
import websockets
import os.path
import re
import random

async def echo(websocket, path):
	async for message in websocket:
		print("--- Incoming Connection:", websocket.remote_address[0], "---")
		print("    Message:", message, end="\n\n")
		if message.split(" ")[0] == "create":
			with open("users/" + message.split(" ")[1], "w+") as f:
				f.write(message.split(" ")[2] + "\n")
		elif message.split(" ")[0] == "query":
			# len([re.findall("\:(.*" + message.split(" ")[1] + ")\\s", line) for line in open("coinids")]) >= 1;
			if (random.randint(0, 5)):
				await websocket.send("1");
			else:
				await websocket.send("0");
		else: # (?<=\:)(.*?)(?=\\s)
			if os.path.exists("users/" + message.split(" ")[0]):
				await websocket.send("1")
			else:
				await websocket.send("0")

asyncio.get_event_loop().run_until_complete(
	websockets.serve(echo, "localhost", 5678))
asyncio.get_event_loop().run_forever()
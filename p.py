import random
import string
import requests

WEBHOOK_URL = "https://discord.com/api/webhook/id_numbers/id_letters/or/replace"

def random_code():
    length = random.randint(8, 12)
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def send_webhook():
    links = []
    for _ in range(30):
        links.append(f"@everyone <https://discord.gift/{random_code()}>")

    content = "\n".join(links)

    try:
        requests.post(
            WEBHOOK_URL,
            json={"content": content},
            timeout=5
        )
    except:
        pass

print("Sending message to the webhook url")
send_webhook()
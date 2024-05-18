# chat/consumers.py
import json

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.chatroom_name = self.scope['url_route']['kwargs']['chatroom_name']
        self.chatroom_group_name = f"chatroom_{self.chatroom_name}"
        async_to_sync(self.channel_layer.group_add)(self.chatroom_group_name,self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.chatroom_group_name,self.channel_name)

    def receive(self, text_data):
        received_data = json.loads(text_data)
        content = received_data['content']
        user = received_data['user']
        timestamp = received_data['timestamp']
        async_to_sync(self.channel_layer.group_send)(
            self.chatroom_group_name,
            {
                'type': 'chat_message',
                'content': content,
                'user': user,
                'timestamp': timestamp
            }
        )

        

    def chat_message(self, event):
        content = event['content']
        user = event['user']
        timestamp = event['timestamp']
        message_object = {
        'user': user,
        'content': content,
        'timestamp': timestamp
        }
        self.send(text_data=json.dumps(message_object))
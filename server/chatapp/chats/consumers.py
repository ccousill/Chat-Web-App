# chat/consumers.py
import json

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.chatroom_name = self.scope['url_route']['kwargs']['chatroom_name']

        self.chatroom_group_name = f"chatroom_{self.chatroom_name}"

        async_to_sync(self.channel_layer.group_add)(self.chatroom_group_name,self.channel_name)

        print(self.chatroom_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.chatroom_group_name,self.channel_name)

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(self.chatroom_group_name,{'type':'chat_message','message':text_data})

    def chat_message(self, event):
        message = event['message']
        print(message)
        self.send(text_data=message)
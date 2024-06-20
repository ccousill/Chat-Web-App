# chat/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from threading import Thread

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.chatroom_name = self.scope['url_route']['kwargs']['chatroom_name']
        self.chatroom_group_name = f"chatroom_{self.chatroom_name}"
        async_to_sync(self.channel_layer.group_add)(self.chatroom_group_name, self.channel_name)
        self.accept()

        # Lazy import KafkaChatConsumer
        from .kafka_consumer import KafkaChatConsumer
        self.kafka_consumer = KafkaChatConsumer(self.chatroom_name, self.handle_kafka_message)
        self.kafka_thread = Thread(target=self.kafka_consumer.start)
        self.kafka_thread.start()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.chatroom_group_name, self.channel_name)
        self.kafka_consumer.stop()
        self.kafka_thread.join()

    def receive(self, text_data):
        received_data = json.loads(text_data)
        content = received_data['content']
        user = received_data['user']
        timestamp = received_data['timestamp']

        # Lazy import models and functions here
        from .models import ChatMessage, Chatroom, User
        from .kafka_producer import send_message_to_kafka

        user_instance = User.objects.get(email=user)
        chatroom_instance = Chatroom.objects.get(name=self.chatroom_name)
        message = ChatMessage.objects.create(
            user=user_instance,
            content=content,
            timestamp=timestamp,
            chatroom=chatroom_instance
        )

        send_message_to_kafka(self.chatroom_name, user, content, timestamp)

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

    def handle_kafka_message(self, message_data):
        self.send(text_data=json.dumps(message_data))
        try:
            # Lazy import models here
            from .models import User, Chatroom, ChatMessage
            user = User.objects.get(username=message_data['user'])
            chatroom = Chatroom.objects.get(name=message_data['room_name'])
            ChatMessage.objects.create(
                user=user,
                content=message_data['content'],
                timestamp=message_data['timestamp'],
                chatroom=chatroom
            )
        except User.DoesNotExist:
            print(f"User {message_data['user']} does not exist.")
        except Chatroom.DoesNotExist:
            print(f"Chatroom {message_data['room_name']} does not exist.")

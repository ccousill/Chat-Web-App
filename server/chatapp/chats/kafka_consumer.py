# kafka_consumer.py
import json
from confluent_kafka import Consumer, KafkaError
from django.conf import settings
from threading import Event
from .models import ChatMessage, Chatroom, User

class KafkaChatConsumer:
    def __init__(self, chatroom_name, message_handler):
        self.chatroom_name = chatroom_name
        self.message_handler = message_handler
        self.stop_event = Event()

    def start(self):
        consumer_config = {
            'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
            'group.id': f'chat-consumer-group-{self.chatroom_name}',
            'auto.offset.reset': 'earliest',
            'security.protocol': 'SASL_SSL',
            'sasl.mechanisms': 'PLAIN',
            'sasl.username': settings.KAFKA_API_KEY,
            'sasl.password': settings.KAFKA_API_SECRET,
        }

        consumer = Consumer(consumer_config)
        consumer.subscribe([settings.KAFKA_TOPIC])

        try:
            while not self.stop_event.is_set():
                msg = consumer.poll(timeout=1.0)
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    else:
                        print(msg.error())
                        break

                message_value = msg.value().decode('utf-8')
                try:
                    message_data = json.loads(message_value)
                    self.message_handler(message_data)
                except (json.JSONDecodeError, KeyError) as e:
                    print(f"Failed to decode message: {e}")

        finally:
            consumer.close()

    def stop(self):
        self.stop_event.set()

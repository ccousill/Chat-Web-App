from confluent_kafka import Producer
from django.conf import settings
import json
# Create Kafka producer configuration
producer_config = {
    'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': settings.KAFKA_API_KEY,
    'sasl.password': settings.KAFKA_API_SECRET,
}

# Create Kafka producer
producer = Producer(producer_config)

# Publish message to Kafka topic
def send_message_to_kafka(room_name, user, content, timestamp):
    message = {
        'room_name':room_name,
        'user': user,
        'content': content,
        'timestamp': timestamp
    }
    producer.produce('chat_messages', json.dumps(message))
    producer.flush()  # Ensure message is sent immediately

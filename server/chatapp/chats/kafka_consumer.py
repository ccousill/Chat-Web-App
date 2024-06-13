from confluent_kafka import Consumer, KafkaError
from django.conf import settings
from .models import ChatMessage, Chatroom, User

def start_consumer():
    # Create Kafka consumer configuration
    consumer_config = {
        'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
        'group.id': 'chat-consumer-group',
        'auto.offset.reset': 'earliest',
        'security.protocol': 'SASL_SSL',
        'sasl.mechanisms': 'PLAIN',
        'sasl.username': settings.KAFKA_API_KEY,
        'sasl.password': settings.KAFKA_API_SECRET,
    }

    # Create Kafka consumer
    consumer = Consumer(consumer_config)

    # Subscribe to Kafka topic
    consumer.subscribe([settings.KAFKA_TOPIC])

    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    print(msg.error())
                    break
            # Process message
            message_value = msg.value().decode('utf-8')
            username, content = message_value.split(':', 1)
            user = User.objects.get(username=username)
            chatroom = Chatroom.objects.first()  # Or any other logic to get the correct chatroom
            ChatMessage.objects.create(user=user, content=content, chatroom=chatroom)
    finally:
        consumer.close()

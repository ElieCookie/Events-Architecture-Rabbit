import * as amqp from 'amqplib';

async function testRabbitMQConnection() {
  const rabbitMQUrl = 'amqp://localhost:5672'; // Replace with your RabbitMQ URL if needed
  try {
    console.log('Attempting to connect to RabbitMQ...');
    const connection = await amqp.connect(rabbitMQUrl);
    console.log('✅ Successfully connected to RabbitMQ');
    await connection.close();
    console.log('✅ Connection closed successfully');
  } catch (error) {
    console.error('❌ Failed to connect to RabbitMQ:', error.message);
  }
}

testRabbitMQConnection();

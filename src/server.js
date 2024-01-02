const { Kafka } = require('kafkajs');
const express = require('express');
const app = express();

const kafka = new Kafka({
  clientId: 'console-consumer',
  brokers: ['localhost:9092']
});

const topic='streamTest'
const consumer = kafka.consumer({ groupId: 'symptom-group' });

const symptomCounts = {};

const predictCounts = {};

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({topic, fromBeginning:true});

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      const newData = JSON.parse(message.value.toString());
      countSymptoms(newData.userinput);
    },
  });
};

const countSymptoms = (symptoms) => {
  symptoms.forEach(symptom => {
    symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
  });
};

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to provide symptom counts to the frontend
app.get('/count', (req, res) => {
  res.json((symptomCounts));
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

runConsumer().catch(console.error);

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const calculation = require('./calculation');

const app = express();
const port = 5000;

const GET_URL = 'https://interview.adpeai.com/api/v1/get-task';
const POST_URL = 'https://interview.adpeai.com/api/v1/submit-task';

let taskData = null;

app.use(cors());
app.use(express.json());

app.get('/get-properties', async (req, res) => {
     try {
        const response = await axios.get(GET_URL);
        taskData = response.data;
        console.log(taskData);
        return res.json(taskData);
      } catch (error) {
        console.error('Error when making the request:', error);
        return res.status(500).json({ error: 'Error getting task data' });
      }
})

app.post('/post-calculations', async (req, res) => {
    try{
        if (!taskData) {
            return res.status(400).send('Task data has not been obtained yet');
          }

        const {id, operation, left, right} = taskData;

        const result = calculation(operation, left, right);
        
        const response = await axios.post(POST_URL, { id, result });
        console.log('Server response to POST:', response.data);

        return  res.status(200).json({ id, result });

    } catch (error) {
        console.error('Error processing:', error);
        return res.status(500).json({ error: 'Error processing the operation' });
      }
})

app.listen(port, () => {
    console.log(`Express server running on the port ${port}`);
  });

module.exports = app;
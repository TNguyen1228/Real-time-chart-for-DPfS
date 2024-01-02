# Real-time-chart-for-DPfS
 
## Requirements
- [Node.js](https://nodejs.org/en/) 
- `npm`

## Running
- First need to run the Kafka server with producer and consumer. The code can be found at [here](https://github.com/TNguyen1228/Last-semester-big-data-management.git)
- `cd` to the `src` folder and run the following command
```bash
cd src
node server.js
npm run dev
```
- Send data from Gradio interface and then check [localhost:3000](localhost:3000) on explorer to see the chart. Chart will change each 3s

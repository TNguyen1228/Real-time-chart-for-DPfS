import Chart from 'chart.js/auto';

// Function to render the chart with initial data
async function renderChart() {
    try {
        const response = await fetch('http://localhost:3000/count'); // Replace with your API endpoint
        const symptomCounts = await response.json();

        const labels = Object.keys(symptomCounts);
        const data = Object.values(symptomCounts);

        return new Chart(document.getElementById('count'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Counts',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Symptom Counts Chart', // Set your chart title here
                        font: {
                            size: 18 // Adjust the font size as needed
                        }
                    }
                },
                indexAxis: 'y',
                scales: {
                    x: {
                        type: 'linear',
                        max:100,
                        beginAtZero: true,
                    },
                    y: {
                        type: 'category',
                    }
                },
                ticks:{
                    stepSize:10,
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update the chart with new data
async function updateChart(chartInstance) {
    try {
        const response = await fetch('http://localhost:3000/count'); // Replace with your API endpoint
        const symptomCounts = await response.json();

        const labels = Object.keys(symptomCounts);
        const data = Object.values(symptomCounts);

        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = data;
        chartInstance.update();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Initial render of the chart
let myChart;
renderChart().then(chart => {
    myChart = chart;
});

// Simulated event listener for receiving new data
// Replace this with your actual event listener logic
setInterval(() => {
    // Simulate receiving new data every 5 seconds
    updateChart(myChart);
}, 3000);

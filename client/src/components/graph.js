import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const GraphContainer = styled.div``;

const datas = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

export default function Graph({ styleObj, data }) {
  // const labels = data.graphData && data.graphData.keys();
  // const dataset = data.graphData && data.graphData.values();

  // const datum = {labels, datasets: [{data: dataset}]}
  console.log(data);
  // data.graphData && data.graphData

  const formattedData = {
    labels: data.graphData && Object.keys(data.graphData),
  datasets: [
    {
      label: 'Attribute Score',
      data: data.graphData && Object.keys(data.graphData).map(function (key) { return data.graphData[key]; }), 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 255, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 255, 255, 1)'
      ],
      borderWidth: 1,
    },
  ],
  }

  return (
    <GraphContainer style={styleObj}>
      <Bar data={formattedData} options={options} />
    </GraphContainer>
  );
}

import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./TspHoldings.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const TspHoldings = () => {
  const [activeTab, setActiveTab] = useState("TSP Holdings");
  const [expandedFundIndex, setExpandedFundIndex] = useState(null);

  const tspFunds = [
    {
      name: "C Fund",
      totalValue: "$50,150",
      riskFactor: "10",
      description: "Highly volatile, good for long-term growth.",
      color: "#1E88E5",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "G Fund",
      totalValue: "$64,198",
      riskFactor: "9",
      description: "Stable and low risk, focused on government securities.",
      color: "#42A5F5",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "I Fund",
      totalValue: "$15,640",
      riskFactor: "7",
      description: "International stocks with higher risk and reward.",
      color: "#90A4AE",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "Y Fund",
      totalValue: "$22,739",
      riskFactor: "10",
      description: "Mid-cap stocks with balanced growth potential.",
      color: "#CFD8DC",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "S Fund",
      totalValue: "$22,739",
      riskFactor: "10",
      description: "Mid-cap stocks with balanced growth potential.",
      color: "#808080",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "F Fund",
      totalValue: "$22,739",
      riskFactor: "10",
      description: "Mid-cap stocks with balanced growth potential.",
      color: "#FFD600",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    }
  ];

  const lookThroughFunds = [
    {
      name: "G Fund",
      totalValue: "$64,198",
      riskFactor: "10",
      description: "Stable and low risk.",
      color: "#42A5F5",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "I Fund",
      totalValue: "$15,640",
      riskFactor: "10",
      description: "International exposure with higher risk.",
      color: "#90A4AE",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
    {
      name: "Y Fund",
      totalValue: "$22,739",
      riskFactor: "10",
      description: "Balanced growth potential.",
      color: "#CFD8DC",
      examples: "Apple, Microsoft, Amazon, Facebook, Google",
    },
  ];

  const calculateTotalValue = (funds) => {
    return funds
      .reduce((acc, fund) => acc + parseInt(fund.totalValue.replace(/[^0-9]/g, "")), 0)
      .toLocaleString();
  };

  const getChartData = (funds) => ({
    labels: funds.map((fund) => fund.name),
    datasets: [
      {
        data: funds.map((fund) =>
          parseInt(fund.totalValue.replace(/[^0-9]/g, ""))
        ),
        backgroundColor: funds.map((fund) => fund.color),
        hoverBackgroundColor: funds.map((fund) => `${fund.color}CC`),
        borderWidth: 2,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    onClick: (event, elements) => handleChartClick(event, elements),
  };

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setExpandedFundIndex(index === expandedFundIndex ? null : index);
    }
  };

  const funds = activeTab === "TSP Holdings" ? tspFunds : lookThroughFunds;

  return (
    <div className="tsp-container">
      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "TSP Holdings" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("TSP Holdings");
            setExpandedFundIndex(null); // To reset expanded state
          }}
        >
          TSP Holdings
        </button>
        <button
          className={`tab ${activeTab === "Look Through Holdings" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Look Through Holdings");
            setExpandedFundIndex(null);
          }}
        >
          Look Through Holdings
        </button>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <Doughnut data={getChartData(funds)} options={chartOptions} />
        <div className="chart-center">
          {activeTab === "TSP Holdings" ? "TSP Total" : "Look Through Total"} <br />
          <span className="chart-total">${calculateTotalValue(funds)}</span>
        </div>
      </div>


      <div className="funds-container">
        <div className="info-header">
          <span className="info-name">Items</span>
          <span className="info-name">Total Value</span>
        </div>

        <hr />
        {funds.map((fund, index) => (
          <div
            key={index}
            className={`fund-card ${expandedFundIndex === index ? "expanded" : ""
              }`}
          >

            <div
              className="fund-header"
              style={{ borderLeft: `5px solid ${fund.color}` }}
            >
              <span className="fund-name" style={{ backgroundColor: fund.color }}>{fund.name}</span>
              <span className="fund-value">
                {fund.totalValue}
                <button
                  className="expand-button"
                  onClick={() =>
                    setExpandedFundIndex(
                      index === expandedFundIndex ? null : index
                    )
                  }
                >
                  {expandedFundIndex === index ? "▲" : "▼"}
                </button>
              </span>
            </div>

            {expandedFundIndex === index && (
              <div className="fund-details">
                <table>
                  <tbody>
                    <tr>
                      <td style={{ width: `30%`, textAlign: 'left' }}><strong>Risk Factor:</strong></td>
                      <td >{fund.riskFactor}</td>
                    </tr>
                    <tr>
                      <td style={{ width: `30%`, textAlign: 'left' }}><strong>Examples:</strong></td>
                      <td >{fund.examples}</td>
                    </tr>
                    <tr>
                      <td style={{ width: `30%`, textAlign: 'left' }}><strong>Description:</strong></td>
                      <td>{fund.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TspHoldings;

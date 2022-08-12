import React, { useState } from "react";
import {
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaSearch } from "react-icons/fa";
import { sendSentence } from "../../Services/adminSentimentalStatsService";
import images from "../../../User-Panel/Components/Common Components/ImportImages";
import Loader from "../../../Utils/Loader.gif";
import "./SentimentalStats.css";

function SentimentalStats() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sentence, setSentence] = useState("");
  const [overallSentiment, setOverallSentiment] = useState("");
  const [positiveSentiments, setPostiveSentiments] = useState(0);
  const [negativeSentiments, setNegativeSentiments] = useState(0);

  const barData = [
    { name: "Positive", sentiment: positiveSentiments },
    { name: "Negative", sentiment: negativeSentiments },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setShow(true);
    setLoading(true);

    const data = { sentence };
    const passSentence = async (data) => {
      const result = await sendSentence(data);
      if (result) {
        setOverallSentiment(result["Overall"]);
        setPostiveSentiments(result["Postive"]);
        setNegativeSentiments(result["Negative"]);
        setLoading(false);
        setShow(true);
      }
    };

    passSentence(data);
  };

  const loaderStyles = {
    width: "90px",
    height: "90px",
    margin: "12% 0 5% 42%",
  };

  return (
    <div className="sentimental-stats">
      <div className="check-stats">
        <form onSubmit={handleSubmit}>
          <input
            className="stats-tab-input"
            type="text"
            placeholder="Sentence..."
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            required
          />
          <button type="submit" className="abc">
            <FaSearch />
          </button>
        </form>

        {loading === true && <img style={loaderStyles} src={Loader} alt="" />}

        {show === false && (
          <div className="stats-hint">
            <h4>
              Write any sentence in the textbox above and click analyze button
              to see the sentiments of the sentence.
            </h4>
            <img src={images.sentiment} alt="" />
          </div>
        )}
      </div>

      {show && loading === false && (
        <div>
          <div className="main-stats">
            <div className="stats-item">
              <h4>Overall Sentiment</h4>
              {overallSentiment === "Positive" ? (
                <span style={{ color: "ForestGreen" }}>{overallSentiment}</span>
              ) : (
                <span style={{ color: "red" }}>{overallSentiment}</span>
              )}
            </div>
            <div className="stats-item">
              <h4>Positive Sentiments</h4>
              <span
                style={{ color: "ForestGreen" }}
              >{`${positiveSentiments}%`}</span>
            </div>
            <div className="stats-item">
              <h4>Negative Sentiments</h4>
              <span style={{ color: "red" }}>{`${negativeSentiments}%`}</span>
            </div>
          </div>

          <div className="stats-detail">
            <div className="stats-line-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={600} height={300} data={barData}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis
                    tickFormatter={(tick) => {
                      return `${tick}%`;
                    }}
                  />
                  <Tooltip
                    wrapperStyle={{
                      width: "fit-content",
                      backgroundColor: "#ccc",
                    }}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Bar dataKey="sentiment" fill="#8884d8" barSize={60}>
                    {barData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.name === "Negative" ? "#FF0000" : "#3CB371"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SentimentalStats;

import { useState } from "react";

export default function PageSpeedChecker() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_KEY = "AIzaSyDXPHfcc7ZGG0uO8TnCq19dx4ogXBvkLfA"; // Replace with your Google API key

  const checkPerformance = async () => {
    if (!url) return;
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&strategy=${strategy}&key=${API_KEY}`
      );

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching PageSpeed data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">PageSpeed Checker</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg mb-4"
        />

        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg mb-4"
        >
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>

        <button
          onClick={checkPerformance}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
        >
          {loading ? "Checking..." : "Check Performance"}
        </button>
      </div>

      {data && data.lighthouseResult && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <p className="text-green-600 font-bold text-2xl">
            Score: {data.lighthouseResult.categories.performance.score * 100}
          </p>
          <div className="mt-4 text-gray-700 text-left">
            <p><strong>LCP:</strong> {data.lighthouseResult.audits["largest-contentful-paint"].displayValue}</p>
            <p><strong>CLS:</strong> {data.lighthouseResult.audits["cumulative-layout-shift"].displayValue}</p>
            <p><strong>INP:</strong> {data.lighthouseResult.audits["interactive"].displayValue}</p>
          </div>
        </div>
      )}
    </div>
  );
}

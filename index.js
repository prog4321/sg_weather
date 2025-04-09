import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const api_url = "https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(api_url);

    const record = response.data.data.records[0];

    var timePeriodStart = [];
    var timePeriodEnd = []
    var centralForecast = [];
    var northForecast = [];
    var eastForecast = [];
    var southForecast = [];
    var westForecast = [];

    // The JSON file returned by the API includes three time periods
    // (in 6-hr or 12-hr blocks), with each time period containing
    // forecasts for the Central, North, East, South and West regions
    for (let i = 0; i < 3; i++) {

      timePeriodStart[i] = formatDateTime(record.periods[i].timePeriod.start, true);
      timePeriodEnd[i] = formatDateTime(record.periods[i].timePeriod.end, true);

      centralForecast[i] = record.periods[i].regions.central.text;
      northForecast[i] = record.periods[i].regions.north.text;
      eastForecast[i] = record.periods[i].regions.east.text;
      southForecast[i] = record.periods[i].regions.south.text;
      westForecast[i] =  record.periods[i].regions.west.text;
    }

    const data = {
      timestamp: formatDateTime(record.timestamp, false),
      generalTemperatureLow: record.general.temperature.low,
      generalTemperatureHigh: record.general.temperature.high,
      generalHumidityLow: record.general.relativeHumidity.low,
      generalHumidityHigh: record.general.relativeHumidity.high,
      generalForecast: record.general.forecast.text,

      timePeriodStart: timePeriodStart,
      timePeriodEnd: timePeriodEnd,
      centralForecast: centralForecast,
      northForecast: northForecast,
      eastForecast: eastForecast,
      southForecast: southForecast,
      westForecast: westForecast
    }

    res.render("index.ejs", {forecast: data});

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

function formatDateTime(entry, isRegionDateTime) {

  entry = entry.slice(0, 10) + " " + entry.slice(11, 19);
  const date = new Date(entry);
  var day = date.toLocaleString('default', { day: 'numeric' })
  var month = date.toLocaleString('default', { month: 'short' })

  var hour = date.toLocaleString('default', { hour: 'numeric' })
  var ampm = hour.slice(-2).toLowerCase();
  
  if (hour.length == 4) {
    hour = hour.slice(0, 1);
  } else {
    hour = hour.slice(0, 2);
  }

  if (isRegionDateTime) {
    time = hour + ampm;
    if (time === "12pm") {
      time = "Noon";
    }
  } else {
    var minute = date.toLocaleString('default', { minute: 'numeric' })
    if (minute.length == 1) {
      minute = "0" + minute;
    }
    var time = hour + ":" + minute + ampm;
  }

  return time + ", " + day + " " + month;
}
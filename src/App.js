import React, { Component } from "react";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";
import VisitInfo from "./Components/VisitInfo";
import axios from "axios";

// const sampleIP = {
//   ip: "67.4.164.47",
//   type: "ipv4",
//   continent_code: "NA",
//   continent_name: "North America",
//   country_code: "US",
//   country_name: "United States",
//   region_code: "MN",
//   region_name: "Minnesota",
//   city: "Minneapolis",
//   zip: "55436",
//   latitude: 44.89057159423828,
//   longitude: -93.35533142089844,
//   location: {
//     geoname_id: 5037649,
//     capital: "Washington D.C.",
//     languages: [
//       {
//         code: "en",
//         name: "English",
//         native: "English",
//       },
//     ],
//     country_flag: "http://assets.ipstack.com/flags/us.svg",
//     country_flag_emoji: "🇺🇸",
//     country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
//     calling_code: "1",
//     is_eu: false,
//   },
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {},
      visitInfo: {},
    };
  }

  // adds visit to backend
  addVisit(resumeData) {
    return axios
      .get(resumeData.config.geoIpServer)
      .then((r) => {
        return axios
          .post(resumeData.config.metricsServer + "/visits", r)
          .then((mr) => {
            this.setState({ visitInfo: mr.data });
          })
          .catch((e) => e);
      })
      .catch((e) => e);
  }

  initApp() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.addVisit(data);
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.initApp();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <VisitInfo data={this.state.visitInfo} />
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;

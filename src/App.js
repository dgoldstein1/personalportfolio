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
          .post(resumeData.config.metricsServer + "/visits", {
            ...r.data,
            href: window.location.search.substr(1),
          })
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

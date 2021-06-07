import React, { Component } from "react";
import FlipNumbers from "react-flip-numbers";

class VisitInfo extends Component {
  state = {
    nVisitorsDisplayed: 0,
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.nVisitorsDisplayed < this.props.data.totalDocs) {
        this.setState({
          nVisitorsDisplayed: this.state.nVisitorsDisplayed + 1,
        });
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <section id="visitinfo">
        <div className="row">
          <div className="conainer-fluid">
            <h1>You are website visit number:</h1>
            <FlipNumbers
              play
              color="#fff"
              background="#333333"
              width={50}
              height={50}
              numbers={`${this.state.nVisitorsDisplayed}`}
            />
            <br />
            <h1>
              <a href="https://determined-tesla-321f59.netlify.app/">
                Click Here
              </a>{" "}
              to see everyone who has visited this site!
            </h1>
          </div>
        </div>
      </section>
    );
  }
}

export default VisitInfo;

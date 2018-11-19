import React from "react";

import { connect } from "react-redux";

import Number from '../components/Number'
import Color from "../components/Color";

import addNum from "../redux/actionCreators/addNum";
import changeColor from "../redux/actionCreators/changeColor";

class HomePage extends React.Component {
  render() {
    return (
      <div className="home">
        <Number num={this.props.num} addNum={this.props.addNum} />
        <Color color={this.props.color} changeColor={this.props.changeColor}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  num: state.num,
  color: state.color
});

const mapDispatchToProps = dispatch => ({
  addNum(num) {
    dispatch(addNum(num));
  },
  changeColor(color) {
    dispatch(changeColor(color));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

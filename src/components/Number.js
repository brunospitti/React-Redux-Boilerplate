import React from "react";
import { connect } from "react-redux";

import addNum from "../redux/actionCreators/addNum";

import { Button } from "./basics/Button";

class Number extends React.Component {
  render() {
    const { num, addNum } = this.props;
    return (
      <div className="number-wrapper">
        <p>
          <strong>Times the button has been clicked:</strong> {num}
        </p>
        <Button text="Increment number" clickBehaviour={() => addNum(num)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  num: state.num
});

const mapDispatchToProps = dispatch => ({
  addNum(num) {
    dispatch(addNum(num));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Number);

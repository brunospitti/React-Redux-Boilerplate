import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { darken, rgba } from "polished";

import changeColor from "../redux/actionCreators/changeColor";

import { Button } from "./basics/Button";

class Color extends React.Component {
  render() {
    const { color, changeColor } = this.props;

    let colorRgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    const ColorWrapper = styled("div")`
      background-color: ${colorRgb};
      height: 250px;
      margin: 0 auto;
      text-align: center;
      font-size: 1.2em;
      .title {
        background: ${rgba("white", 0.7)};
        width: 100%;
        padding: 20px;
      }
      .content {
        padding: 40px;
      }
      button {
        margin-top: 40px;
        background-color: ${darken(0.2, colorRgb)};
      }
    `;

    return (
      <ColorWrapper>
        <div className="title">Randomize background-color by rgb values</div>
        <div className="content">
          <div>
            RGB({" "}
            {color.map((colorU, i) => (
              <span key={i}>
                {colorU}
                {color.length !== i + 1 && ", "}
              </span>
            ))}{" "}
            )
          </div>
          <Button text="Change color" clickBehaviour={changeColor} />
        </div>
      </ColorWrapper>
    );
  }
}

const mapStateToProps = state => ({
  color: state.color
});

const mapDispatchToProps = dispatch => ({
  changeColor(color) {
    dispatch(changeColor(color));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Color);

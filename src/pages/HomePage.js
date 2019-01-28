import React from "react";
import styled from "react-emotion";

import { colors } from "../globalStyles";

import Number from "../components/Number";
import Color from "../components/Color";

export default class HomePage extends React.Component {
  render() {
    const CenteredContainer = styled("div")`
      width: 60%;
      position: relative;
      padding: 20px 0;
      margin: 30px auto;
      text-align: center;
      &:before {
        content: "";
        display: block;
        position: absolute;
        width: 120%;
        left: -10%;
        top: 0;
        height: 1px;
        background-color: ${colors.lightGrey};
      }
    `;

    return (
      <div className="home">
        <CenteredContainer>
          <Number />
        </CenteredContainer>
        <CenteredContainer>
          <Color />
        </CenteredContainer>
      </div>
    );
  }
}

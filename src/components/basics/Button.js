import React from "react";
import { css } from "emotion";

import { colors } from "../../globalStyles";

const btn = css`
  cursor: pointer;
  background: ${colors.primary};
  border: 0;
  padding: 10px 30px;
  border-radius: 3px;
  color: ${colors.light};
  margin: 10px auto;
`;

const secondary = css`
  background: ${colors.secondary};
`;

const danger = css`
  background: ${colors.danger};
`;

export class Button extends React.PureComponent {
  classes = () => {
    if (this.props.secondary) {
      return `${btn} ${secondary}`;
    } else if (this.props.danger) {
      return `${btn} ${danger}`;
    }
    return btn;
  };

  render() {
    return (
      <button
        className={`${this.classes()}`}
        onClick={this.props.clickBehaviour}
      >
        {this.props.text}
      </button>
    );
  }
}

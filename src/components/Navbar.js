import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

import { colors } from '../globalStyles';


// styles with styled-components
const Container = styled("header")`
  background-color: ${colors.primary};
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 20px;
`;

const NavLink = styled(Link)`
  font-size: 20px;
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export class Navbar extends React.PureComponent {

  render() {
    return (
      <Container>
        <NavLink to="/">React + Redux</NavLink>
        <NavLink to="/search-params">
        </NavLink>
      </Container>
    );
  }
}

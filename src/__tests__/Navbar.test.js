import React from "react";
import { create } from "react-test-renderer";
import { Navbar } from "../components/Navbar";

test("snapshot", () => {
  const c = create(<Navbar />);
  expect(c.toJSON()).toMatchSnapshot();
});
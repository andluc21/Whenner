import React from "react";
import ReactDOM from "react-dom";
import Button from "../button";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
  // expect(linkElement).toBeInTheDocument();
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Button label="Want to check the weather?" />);
  expect(getByTestId("button")).toHaveTextContent("Want to check the weather?");
});

it("renders button correctly", () => {
  const { getByTestId } = render(<Button label="save" />);
  expect(getByTestId("button")).toHaveTextContent("save");
});

it("matches snapshot 1", () => {
  const tree = renderer.create(<Button label="save"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot 2", () => {
  const tree = renderer
    .create(<Button label="Want to check the weather?"></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

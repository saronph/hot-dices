import React from "react";
import { render } from "@testing-library/react-native";
import { Dashboard } from "./";
import { TestProviders } from "../../providers/TestProviders";

describe("Dashboard", () => {
  it("should render Dashboard screen correctly", () => {
    const { toJSON } = render(
      <TestProviders>
        <Dashboard />
      </TestProviders>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("should render Dashboard texts correctly", () => {
    const { getByText } = render(
      <TestProviders>
        <Dashboard />
      </TestProviders>
    );

    expect(getByText("Roll Dice")).toBeTruthy();
  });
});

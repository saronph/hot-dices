import React from "react";
import { render } from "@testing-library/react-native";
import { Dashboard } from "./";
import { TestProviders } from "../../providers/TestProviders";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-localization", () => ({
  locale: "en",
  locales: ["en"],
  timezone: "UTC",
  isRTL: false,
  getLocales: () => [
    {
      languageCode: "en",
      countryCode: "US",
      languageTag: "en-US",
      isRTL: false,
    },
  ],
}));

jest.mock("../../lib/ads", () => ({
  showInterstitialAd: jest.fn(),
}));

describe("Dashboard", () => {
  it("should render Dashboard screen correctly", () => {
    const { toJSON } = render(
      <TestProviders>
        <Dashboard />
      </TestProviders>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render Dashboard texts correctly", () => {
    const { getByText } = render(
      <TestProviders>
        <Dashboard />
      </TestProviders>
    );

    expect(getByText("Roll Dice")).toBeTruthy();
    // expect(getByText("diceGameDescription")).toBeTruthy();
    // expect(getByText("comingSoon")).toBeTruthy();
    // expect(getByText("newFeatureDescription")).toBeTruthy();
    // expect(getByText("Hot Dices")).toBeTruthy();
  });
});

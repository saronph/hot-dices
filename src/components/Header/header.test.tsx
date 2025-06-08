import { render } from "@testing-library/react-native";
import { Header } from "./index";
import { Text } from "react-native";
import { AppProviders } from "../../providers/AppProviders";

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

describe("Header", () => {
  it("should render correctly and show children", () => {
    const { toJSON } = render(
      <AppProviders>
        <Header>
          <Text>Hello</Text>
        </Header>
      </AppProviders>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

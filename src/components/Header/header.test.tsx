import { render } from "@testing-library/react-native";
import { Header } from "./index";
import { Text } from "react-native";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("Header", () => {
  it("should render correctly", () => {
    const { toJSON } = render(
      <Header>
        <Text>Hello</Text>
      </Header>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

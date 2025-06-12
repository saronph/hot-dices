import { render } from "@testing-library/react-native";
import { Header } from "./index";
import { Text } from "react-native";
import { AppProviders } from "../../providers/AppProviders";

describe("Header", () => {
  it("should render correctly and show children", () => {
    const { toJSON } = render(
      <AppProviders>
        <Header>
          <Text>Hello</Text>
        </Header>
      </AppProviders>
    );
    expect(toJSON()).toBeTruthy();
  });
});

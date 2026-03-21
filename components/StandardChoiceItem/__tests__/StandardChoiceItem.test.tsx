import { Game } from "@/constants/StandarGames";
import { render, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import { renderRouter, screen } from "expo-router/testing-library";
import { Image, Text } from "react-native";
import StandardChoiceItem from "../StandardChoiceItem";

const mockProps: Game = {
  name: "Blitz",
  time: 3,
  image: require("../../../assets/images/Blitz.png"),
};

jest.mock("expo-constants", () => {
  const ConstantsModule = jest.requireActual("expo-constants");
  const { default: Constants } = ConstantsModule;
  return {
    ...ConstantsModule,
    // must explicitly include this in order to mock both default and named exports
    __esModule: true,
    default: {
      ...Constants,
      manifest: {
        ...Constants.manifest,
        scheme: "myapp",
      },
      expoConfig: {
        scheme: "myapp",
      },
    },
  };
});

jest.mock("expo-font", () => {
  const module: typeof import("expo-font") = {
    ...jest.requireActual("expo-font"),
    isLoaded: jest.fn(() => true),
  };

  return module;
});

jest.mock("expo-linking", () => ({
  ...jest.requireActual("expo-linking"),
  openURL: jest.fn().mockResolvedValue(true),
}));

test("Navigation to play screen", async () => {
  const navigateSpy = jest.spyOn(router, "navigate");
  renderRouter({
    index: jest.fn(() => <StandardChoiceItem {...mockProps} />),
    play: jest.fn(() => <Text>Play Screen</Text>),
  });
  const user = userEvent.setup();
  await user.press(screen.getByRole("link"));
  expect(screen).toHavePathnameWithParams("/play?whiteTime=3&blackTime=3");
});

test("Render component without crash", () => {
  render(<StandardChoiceItem {...mockProps} />);
});

test("Display game name", () => {
  render(<StandardChoiceItem {...mockProps} />);
  expect(screen.getByText(mockProps.name)).toBeOnTheScreen();
});

test("Display game image", () => {
  const { UNSAFE_getByType } = render(<StandardChoiceItem {...mockProps} />);
  expect(UNSAFE_getByType(Image)).toBeTruthy();
});

test("Display game time", () => {
  render(<StandardChoiceItem {...mockProps} />);
  expect(screen.getByText("3 min")).toBeOnTheScreen();
});

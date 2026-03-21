import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { screen } from "expo-router/testing-library";
import CostumeGameForm from "../CostumeGameForm";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  mockPush.mockClear();
});

test("Render components without crash", () => {
  render(<CostumeGameForm />);
});

test("Display fields", () => {
  render(<CostumeGameForm />);
  expect(screen.getByPlaceholderText("White player name")).toBeOnTheScreen();
  expect(screen.getByPlaceholderText("White time in min")).toBeOnTheScreen();
  expect(screen.getByPlaceholderText("Black player name")).toBeOnTheScreen();
  expect(screen.getByPlaceholderText("Black time in min")).toBeOnTheScreen();
});

test("Enter white player name", () => {
  render(<CostumeGameForm />);
  const whiteName = screen.getByTestId("white-name-input");
  fireEvent.changeText(whiteName, "Mohand");
  expect(whiteName.props.value).toBe("Mohand");
});

test("Enter white player time", () => {
  render(<CostumeGameForm />);
  const whiteTime = screen.getByTestId("white-time-input");
  fireEvent.changeText(whiteTime, "5");
  expect(screen.getByDisplayValue("5")).toBeOnTheScreen();
});

test("Enter black player name", () => {
  render(<CostumeGameForm />);
  const blackName = screen.getByTestId("black-name-input");
  fireEvent.changeText(blackName, "sofiane");
  expect(blackName.props.value).toBe("sofiane");
});

test("Enter black player time", () => {
  render(<CostumeGameForm />);
  const blackTime = screen.getByTestId("black-time-input");
  fireEvent.changeText(blackTime, "14");
  expect(screen.getByDisplayValue("14")).toBeOnTheScreen();
});

test("Navigation to play with correct times", () => {
  render(<CostumeGameForm />);
  fireEvent.changeText(screen.getByTestId("white-name-input"), "Mohand");
  fireEvent.changeText(screen.getByTestId("white-time-input"), "5");
  fireEvent.changeText(screen.getByTestId("black-name-input"), "sofiane");
  fireEvent.changeText(screen.getByTestId("black-time-input"), "14");
  fireEvent.press(screen.getByText("Play"));
  expect(mockPush).toHaveBeenLastCalledWith({
    pathname: "/play",
    params: {
      whiteTime: 5,
      blackTime: 14,
    },
  });
});

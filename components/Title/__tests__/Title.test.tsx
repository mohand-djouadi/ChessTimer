import { render, screen } from "@testing-library/react-native";
import Title from "../Title";

test("Render Title components without crash", () => {
  render(<Title />);
});

test("Display let's play title", () => {
  render(<Title />);
  expect(screen.getByText("Let's play")).toBeOnTheScreen();
});

test("display Chess title", () => {
  render(<Title />);
  expect(screen.getByText("Chess")).toBeOnTheScreen();
});

test("Render both titles", () => {
  render(<Title />);
  expect(screen.getByText("Let's play")).toBeOnTheScreen();
  expect(screen.getByText("Chess")).toBeOnTheScreen();
});

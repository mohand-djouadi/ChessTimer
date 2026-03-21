declare global {
  namespace jest {
    interface Matchers<R> {
      toHavePathnameWithParams(pathname: string): R;
      toHavePathname(pathname: string): R;
    }
  }
}
export { };


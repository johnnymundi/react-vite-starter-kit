import "styled-components";

type ColorTheme = {
  black: string;
  white: string;
  grey: string;
  red: string;
  green: string;
  orange: string;
  blue: string;
  purple: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTheme;
  }
}

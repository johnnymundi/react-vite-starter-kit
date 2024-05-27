import styled from "styled-components";

type ButtonProps = {
  color: string;
  size?: string;
  ghost?: boolean;
};

const getColor = (props: any, color: string) => {
  if (color === "blue") return props.theme.colors.blue;
  if (color === "green") return props.theme.colors.green;
  if (color === "black") return props.theme.colors.black;
  if (color === "orange") return props.theme.colors.orange;
  if (color === "blue") return props.theme.colors.blue;
  if (color === "red") return props.theme.colors.red;
  if (color === "purple") return props.theme.colors.purple;
};

export const Button = styled.button<ButtonProps>`
  width: ${(props) =>
    props.size === "sm" ? "130px" : props.size === "md" ? "167px" : "217px"};
  height: ${(props) => (props.size === "sm" ? "35px" : "47px")};
  background: ${(props) => getColor(props, props.color)};
  border-radius: 2.5px;
  cursor: pointer;
  font-weight: bold;
  border: ${(props) =>
    props.ghost ? `1px solid ${getColor(props, props.color)}` : "none"};
  color: ${(props) =>
    props.ghost ? getColor(props, props.color) : props.theme.colors.white};
`;

import styled from "styled-components";

interface ContainerProps {
  level: number;
}

export const Container = styled.h2<ContainerProps>`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: ${(props) =>
    props.level === 1 ? "28px" : props.level === 2 ? "22px" : "16px"};
  line-height: 100%;
  letter-spacing: -0.015em;
  color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.blue
      : props.color === "orange"
      ? props.theme.colors.orange
      : props.color === "red"
      ? props.theme.colors.red
      : props.color === "green"
      ? props.theme.colors.green
      : props.theme.colors.black};
  margin: 0;
  margin-top: 10px;
`;

import { Container } from "./styles";

type TitleTextProps = {
  color?: string;
  level: number;
  title: string;
};

export const TitleText = ({ level, title, color }: TitleTextProps) => {
  return <Container color={color} level={level}>{title}</Container>;
};

import { useTranslation } from "react-i18next";
import "../../pages/Login/styles.css";
import { Container } from "./styles";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <p style={{ color: "black" }}>{t("home")}</p>
    </Container>
  );
};

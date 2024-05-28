import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <h2>{t("header")}</h2>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("pt")}>Português</button>
    </header>
  );
};

export default Header;

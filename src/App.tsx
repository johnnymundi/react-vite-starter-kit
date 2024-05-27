import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { Button } from "./components/Button/styles";
import theme from "./theme";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div>Simbora manooowww</div>
          <Button color="orange">Clica nessa peste!</Button>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

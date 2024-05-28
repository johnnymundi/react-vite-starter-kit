import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { AuthContext, AuthProvider } from "./contexts/userAuth";
import "./i18n";
import { ProjectRoutes } from "./routes";
import theme from "./theme";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <AuthProvider>
              <div>
                <AuthContext.Consumer>
                  {(context) => context.isAuthenticated}
                </AuthContext.Consumer>
                <Toaster position="top-right" reverseOrder={true}></Toaster>
                <ProjectRoutes />
              </div>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_: any, info: React.ErrorInfo) {
    this.setState({ errorInfo: info });
    // TODO ADD LOG
  }

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError && this.state.errorInfo) {
      return (
        <div style={{ padding: "20px" }}>
          <h1>Algo deu errado.</h1>
          <p>Por favor, entre em contato com a OGV Color.</p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {this.state.errorInfo.componentStack}
          </p>
          <button onClick={this.handleGoBack}>Voltar</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

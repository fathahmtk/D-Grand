import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Unhandled UI error', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#b8860b] mb-4">D Grand Jewellery</p>
            <h1 className="font-display text-3xl md:text-4xl text-[#1f1f1f] mb-3">Something went wrong</h1>
            <p className="text-[#555] mb-8 max-w-md">
              We hit an unexpected issue while loading this page. Please refresh and try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#b8860b] text-white hover:bg-[#a77a09] transition-colors rounded-md shadow-soft"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

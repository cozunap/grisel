import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-main)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-sans)',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '16px', color: 'var(--gold)' }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.1rem', color: 'var(--ink-soft)' }}>
            We've encountered an unexpected issue while loading this page. Please try refreshing or return to the homepage.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '12px 24px',
                background: 'var(--ink)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Refresh Page
            </button>
            <a 
              href="/"
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

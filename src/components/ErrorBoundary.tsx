import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected application error occurred.',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let readableMessage = this.state.message;
      try {
        const parsed = JSON.parse(this.state.message) as {
          error?: string;
          operationType?: string;
          path?: string;
        };
        if (parsed.error) {
          readableMessage = `${parsed.error}${parsed.path ? ` (${parsed.operationType ?? 'read'} on ${parsed.path})` : ''}`;
        }
      } catch {
        // Plain string error message
      }

      return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#07133B] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-7 space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center mx-auto border border-red-100">
              <AlertTriangle className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold text-[#07133B]">Something went wrong</h1>
            <p className="text-sm text-slate-600 leading-relaxed break-words">
              {readableMessage}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, message: '' });
                  window.location.hash = '#home';
                  window.location.reload();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#003BFF] hover:bg-[#0028B8] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Site</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

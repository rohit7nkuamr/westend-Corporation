import React from 'react'
import { AlertTriangle } from 'lucide-react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    handleReload = () => {
        // Reset error state and reload
        this.setState({ hasError: false, error: null, errorInfo: null })
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="text-red-600" size={40} />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            We encountered an unexpected error. Don't worry, this has been logged and we'll look into it.
                        </p>

                        {this.state.error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                                <p className="text-sm font-mono text-red-800 break-words">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={this.handleReload}
                                className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Reload Page
                            </button>
                            <a
                                href="/"
                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                            >
                                Go Home
                            </a>
                        </div>

                        <p className="text-xs text-gray-500 mt-6">
                            If this problem persists, please contact our support team.
                        </p>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

export default function ErrorPage() {
  const navigate = useNavigate();
  const { refetchUser } = useUser();
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryError(null);
    
    try {
      await refetchUser();
      navigate('/');
    } catch (error) {
      console.error('Failed to refetch user:', error);
      setRetryError('Connection failed. Please try again later.');
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Server Unavailable</h1>
          <p className="text-gray-600 mb-4">We apologize for the inconvenience caused.</p>
          <p className="text-gray-500 text-sm">Our team has been notified and is working to resolve the issue.</p>
        </div>
        
        {retryError && (
          <div className="text-red-500 text-sm mb-4">
            {retryError}
          </div>
        )}
        
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-300"
          >
            {isRetrying ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Retry Connection</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { ROUTES } from '@/services/utils';

export default function ErrorPage() {
  const navigate = useNavigate();
  const { refetchUser } = useUser();

  const handleRetry = async () => {
    try {
      await refetchUser();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Failed to refetch user:', error);
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
        
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { LoginForm } from '../components/auth/LoginForm';
import { Alert } from '../components/common/Alert';

export const Login = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          {message && (
            <Alert type="success" message={message} onClose={() => setMessage('')} />
          )}
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};
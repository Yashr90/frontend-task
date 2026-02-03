import React from 'react';
import { Layout } from '../components/layout/Layout';
import { SignupForm } from '../components/auth/SignupForm';

export const Signup = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <SignupForm />
      </div>
    </Layout>
  );
};
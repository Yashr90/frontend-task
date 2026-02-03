import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ProfileCard } from '../components/profile/ProfileCard';

export const Profile = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <ProfileCard />
      </div>
    </Layout>
  );
};
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { TaskList } from '../components/tasks/TaskList';

export const Dashboard = () => {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};
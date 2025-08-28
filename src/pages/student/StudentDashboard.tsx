import React from 'react';
import { StudentTabs } from '@/components/navigation/StudentTabs';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <StudentTabs />
    </div>
  );
};
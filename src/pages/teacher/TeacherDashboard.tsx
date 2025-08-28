import React from 'react';
import { TeacherTabs } from '@/components/navigation/TeacherTabs';

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <TeacherTabs />
    </div>
  );
};
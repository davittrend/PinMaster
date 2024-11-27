import React from 'react';
import { DashboardLayout } from '../components/Dashboard/DashboardLayout';
import { AccountsManager } from '../components/Accounts/AccountsManager';

function AccountsPage() {
  return (
    <DashboardLayout>
      <AccountsManager />
    </DashboardLayout>
  );
}

export default AccountsPage;

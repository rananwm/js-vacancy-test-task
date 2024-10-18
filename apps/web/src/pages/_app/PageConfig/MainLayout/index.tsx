import React, { FC, ReactElement } from 'react';
import { AppShell, Stack } from '@mantine/core';

import { accountApi } from 'resources/account';

import Header from 'components/header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <AppShell
      component={Stack}
      header={{
        height: {
          base: 'auto',
          md: 90,
        },
      }}
      bg="black-50"
    >
      <Header />

      <AppShell.Main
        px={{
          base: 20,
          md: 50,
        }}
        mt={{
          base: 250,
          xs: 150,
          md: 10,
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;

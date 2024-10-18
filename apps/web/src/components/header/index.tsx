import React, { FC, memo } from 'react';
import Link from 'next/link';
import { Anchor, AppShell, Box, Flex, Group } from '@mantine/core';

import { accountApi } from 'resources/account';

import HeaderMenu from 'components/header/headerMenu';
import UserMenu from 'components/header/userMenu';

import { LogoImage } from 'public/images';

import { RoutePath } from 'routes';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <>
      <AppShell.Header h={90} bg="#FCFCFC" style={{ border: 'none' }} visibleFrom="md">
        <Group h={72} px={48} py={16} justify="space-between" bg="#FCFCFC">
          <Anchor component={Link} href={RoutePath.Home}>
            <LogoImage />
          </Anchor>

          <HeaderMenu />

          <UserMenu />
        </Group>
      </AppShell.Header>
      <AppShell.Header bg="#FCFCFC" style={{ border: 'none' }} hiddenFrom="md">
        <Flex direction="column" align="center" pb="lg">
          <Group px={24} py={16} w="100%" justify="space-between" bg="#FCFCFC">
            <Anchor component={Link} href={RoutePath.Home}>
              <LogoImage />
            </Anchor>

            <UserMenu />
          </Group>

          <Box px={8}>
            <HeaderMenu />
          </Box>
        </Flex>
      </AppShell.Header>
    </>
  );
};

export default memo(Header);

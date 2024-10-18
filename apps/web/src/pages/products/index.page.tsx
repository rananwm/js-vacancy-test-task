import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Group, Skeleton, Stack, Title } from '@mantine/core';

import { productApi } from 'resources/product';

import { CreateNewProduct } from 'components/products/createNewProduct';
import { PrivateProduct } from 'components/products/privateProduct';

const Products: NextPage = () => {
  const { data: products, isLoading } = productApi.useGetMyProducts();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Stack gap={20} pb={50}>
        <Title order={2}>Your Products</Title>
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
            ))}
          </>
        ) : (
          <Group gap={20} justify="center">
            <CreateNewProduct />

            {products?.results?.map((p) => <PrivateProduct key={p._id} product={p} />)}
          </Group>
        )}
      </Stack>
    </>
  );
};

export default Products;

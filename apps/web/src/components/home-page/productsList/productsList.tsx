import React, { memo } from 'react';
import { Box, Center, Group, Skeleton, Text } from '@mantine/core';
import { SortDirection } from '@tanstack/react-table';

import { ProductResponce } from 'resources/product/product.api';

import { ListResult } from 'types';

import { Product } from './product';
import { SortByNewest } from './sortByNewest';

type ProductsListProps = {
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<SortDirection>>;
  isProductListLoading: boolean;
  products: { products: ListResult<ProductResponce>; cartProductIds: string[] } | undefined;
  filterPriceFrom: string;
  filterPriceTo: string;
  setFilterPriceFrom: React.Dispatch<React.SetStateAction<string>>;
  setFilterPriceTo: React.Dispatch<React.SetStateAction<string>>;
};

export const ProductsList = memo(
  ({
    sorting,
    setSorting,
    isProductListLoading,
    products,
    setFilterPriceTo,
    setFilterPriceFrom,
    filterPriceFrom,
    filterPriceTo,
  }: ProductsListProps) => (
    <Box>
      <SortByNewest
        setSorting={setSorting}
        sorting={sorting}
        setFilterPriceFrom={setFilterPriceFrom}
        setFilterPriceTo={setFilterPriceTo}
        products={products?.products}
        filterPriceFrom={filterPriceFrom}
        filterPriceTo={filterPriceTo}
      />
      <Group gap={20} justify="center">
        {isProductListLoading && (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
            ))}
          </>
        )}
        {products?.products?.results?.map((p) => (
          <Product product={p} cartProductIds={products?.cartProductIds} key={p._id} />
        ))}
        {products && products.products.results.length === 0 && (
          <Center w="100%">
            <Text mt={40} c="black-600" fw="bold" size="xl">
              No products found
            </Text>
          </Center>
        )}
      </Group>
    </Box>
  ),
);

ProductsList.displayName = 'ProductsList';

import React, { useLayoutEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Stack } from '@mantine/core';
import { SortDirection } from '@tanstack/react-table';

import { productApi } from 'resources/product';

import { FilterCard } from 'components/home-page/filterCard';
import { PaginationControls } from 'components/home-page/paginationControls';
import { ProductsList } from 'components/home-page/productsList/productsList';
import { SearchProducts } from 'components/home-page/searchProducts';

import { ProductsListParams } from 'types';

import { PER_PAGE } from './constants';

const Marketplace: NextPage = () => {
  const [page, setPage] = useState<number>(1);
  const [filterPriceFrom, setFilterPriceFrom] = useState<string>('');
  const [filterPriceTo, setFilterPriceTo] = useState<string>('');

  const [params, setParams] = useState<ProductsListParams>({
    page: 1,
    perPage: 5,
  });

  const [sorting, setSorting] = useState<SortDirection>('asc');

  const { data: products, isLoading: isProductListLoading } = productApi.useGetProducts({ ...params });

  useLayoutEffect(() => {
    if (!filterPriceFrom) {
      setParams((prev) => ({
        ...prev,
        filter: {},
      }));
    }

    if (filterPriceTo) {
      setParams((prev) => ({
        ...prev,
        filter: { price: { from: +filterPriceFrom, to: +filterPriceTo } },
      }));
    }
  }, [filterPriceFrom, filterPriceTo]);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page, perPage: PER_PAGE }));
  }, [page]);

  useLayoutEffect(() => {
    setParams((prev) => ({
      ...prev,
      sort: sorting === 'asc' ? { createdOn: 'asc' } : { createdOn: 'desc' },
    }));
  }, [sorting]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>

      <Flex
        gap={28}
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        <FilterCard
          filterPriceTo={filterPriceTo}
          filterPriceFrom={filterPriceFrom}
          setFilterPriceFrom={setFilterPriceFrom}
          setFilterPriceTo={setFilterPriceTo}
        />
        <Stack gap={20} flex={1}>
          <SearchProducts setParams={setParams} params={params} isProductListLoading={isProductListLoading} />
          <ProductsList
            sorting={sorting}
            setSorting={setSorting}
            products={products}
            filterPriceFrom={filterPriceFrom}
            filterPriceTo={filterPriceTo}
            isProductListLoading={isProductListLoading}
            setFilterPriceTo={setFilterPriceTo}
            setFilterPriceFrom={setFilterPriceFrom}
          />
          <PaginationControls page={page} pagesCount={products?.products.pagesCount} setPage={setPage} />
        </Stack>
      </Flex>
    </>
  );
};

export default Marketplace;

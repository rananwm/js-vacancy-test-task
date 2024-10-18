import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Skeleton, Table } from '@mantine/core';

import { useGetHistory } from 'resources/cart/cart.api';

import EmptyPage from 'components/basket/emptyPage/emptyPage';
import HistoryRow from 'components/basket/historyRow/historyRow';

const tableHead = (
  <Table.Tr c="#767676">
    <Table.Th>Item</Table.Th>
    <Table.Th>Unit Price</Table.Th>
    <Table.Th>Quantity</Table.Th>
    <Table.Th>Date</Table.Th>
    <Table.Th />
  </Table.Tr>
);

const History: NextPage = () => {
  const { data: history, isFetched, isLoading } = useGetHistory();

  if (isFetched && history && !history.length) {
    return <EmptyPage />;
  }

  const tableRow = history?.map((element) => <HistoryRow key={element._id} cart={element} />);

  return (
    <>
      <Head>
        <title>History</title>
      </Head>

      <Box>
        <Box w="70%" mt="30px">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
              ))}
            </>
          ) : (
            <Table captionSide="bottom" w={1000}>
              <Table.Thead>{tableHead}</Table.Thead>
              <Table.Tbody>{tableRow}</Table.Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </>
  );
};

export default History;

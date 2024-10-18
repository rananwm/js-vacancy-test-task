import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Card, Divider, Flex, Group, Skeleton, Table, Text } from '@mantine/core';
import { loadStripe } from '@stripe/stripe-js';

import { CardResponce, useCheckoutCart, useGetCart } from 'resources/cart/cart.api';

import { BasicButton } from 'components/basic-button/basicButton';
import CartRow from 'components/basket/cartRow/cartRow';
import EmptyPage from 'components/basket/emptyPage/emptyPage';

import config from 'config';

import { ProductStatus, SaleStatus } from 'schemas';

import classes from './cart.module.css';

const tableHead = (
  <Table.Tr c="#767676">
    <Table.Th>Item</Table.Th>
    <Table.Th>Unit Price</Table.Th>
    <Table.Th>Quantity</Table.Th>
    <Table.Th />
  </Table.Tr>
);

const Cart: NextPage = () => {
  const { data: carts, isFetched, isLoading } = useGetCart();
  const { mutateAsync: checkoutCart, isPending } = useCheckoutCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = carts?.reduce((acc, el) => acc + (el.product?.price ?? 0) * el.quantity, 0);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    price && setTotalPrice(price);
  }, [carts]);

  const makePayment = async () => {
    if (config.STRIPE_PK) {
      const stripe = await loadStripe(config.STRIPE_PK);

      const session = await checkoutCart();

      await stripe?.redirectToCheckout({ sessionId: session.id });
    }
  };

  if (isFetched && carts && !carts.length) {
    return <EmptyPage />;
  }

  const tableRow = carts?.map((element: CardResponce) => <CartRow key={element._id} cart={element} />);

  const isSomethingSold = carts?.some((cart) => cart.product.saleStatus === SaleStatus.SOLD);
  const isSomethingDeleted = carts?.some((cart) => cart.product.productStatus === ProductStatus.DELETED);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Flex
        justify="space-between"
        mt="30px"
        direction={{
          base: 'column',
          md: 'row',
        }}
        gap={{
          base: 'lg',
          md: '0',
        }}
      >
        <Box
          w={{
            base: '100%',
            md: '70%',
          }}
        >
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
              ))}
            </>
          ) : (
            <Table captionSide="bottom">
              <Table.Thead>{tableHead}</Table.Thead>
              <Table.Tbody>{tableRow}</Table.Tbody>
            </Table>
          )}
        </Box>
        <Box>
          <Card
            w={{
              base: '100%',
              md: '315px',
            }}
            shadow="sm"
            padding="xs"
            radius="md"
            p="lg"
            bd="1px solid black-100"
            withBorder
          >
            <Group justify="space-between" mt="xs" mb="xs">
              <Text className={classes.summary} fw={700}>
                Summary
              </Text>
            </Group>
            <Divider c="black-200" />
            <Group justify="space-between" mt="xs" mb="xs">
              <Text fw={500} className={classes.totalPrice} size="sm" c="dimmed">
                Total price
              </Text>
              <Text className={classes.summary} fw={700} size="sm">
                ${totalPrice}
              </Text>
            </Group>

            <BasicButton
              disabled={isSomethingSold || isSomethingDeleted}
              onClick={makePayment}
              isLoading={isPending}
              fullWidth
              variant="filled"
              text="Proceed to Checkout"
              backGroundColor="blue"
              marginTop="md"
            />
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default Cart;

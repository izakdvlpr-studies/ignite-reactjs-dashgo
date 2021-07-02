import { useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { User, useUsers } from '../../hooks/useUsers';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { SideBar } from '../../components/SideBar';

interface UserListProps {
  users: User[];
  totalCount: number;
}

export default function UserList({ users, totalCount }: UserListProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get(`users/${userId}`);

        return data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutos
      },
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.8" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários{' '}
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      {isWideVersion && (
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="green"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const { users, totalCount } = getUsers(1);

  return {
    props: {
      users: [
        {
          id: '1',
          name: 'User 1',
          email: 'theo.hoeger@gmail.com',
          createdAt: '24 de junho de 21',
        },
        {
          id: '2',
          name: 'User 2',
          email: 'ethyl.feest@gmail.com',
          createdAt: '30 de junho de 21',
        },
        {
          id: '3',
          name: 'User 3',
          email: 'jewel.sipes@hotmail.com',
          createdAt: '28 de junho de 21',
        },
        {
          id: '4',
          name: 'User 4',
          email: 'jonathon_anderson69@yahoo.com',
          createdAt: '30 de junho de 21',
        },
        {
          id: '5',
          name: 'User 5',
          email: 'emmy_pfeffer@gmail.com',
          createdAt: '25 de junho de 21',
        },
        {
          id: '6',
          name: 'User 6',
          email: 'kirstin57@gmail.com',
          createdAt: '28 de junho de 21',
        },
        {
          id: '7',
          name: 'User 7',
          email: 'breanne_gleichner31@hotmail.com',
          createdAt: '29 de junho de 21',
        },
        {
          id: '8',
          name: 'User 8',
          email: 'jalen.ratke@hotmail.com',
          createdAt: '29 de junho de 21',
        },
        {
          id: '9',
          name: 'User 9',
          email: 'erika_hessel@gmail.com',
          createdAt: '28 de junho de 21',
        },
        {
          id: '10',
          name: 'User 10',
          email: 'nia11@hotmail.com',
          createdAt: '25 de junho de 21',
        },
      ],
      totalCount: 10,
    },
  };
};

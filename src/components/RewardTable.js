import {
  Container,
  Spinner,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactionData, convertMonths } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export const RewardTable = () => {
  const { currentMonth } = useParams();
  const navigate = useNavigate();
  const current = +currentMonth;
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => setData(await getTransactionData(current));
    fetchData();
  }, [current]);

  const ButtonComponent = () => (
    <Flex mt={5} justifyContent="space-between">
      <Button
        variantColor="teal"
        variant="outline"
        mr={2}
        onClick={() => navigate(`/${current === 1 ? 3 : current - 1}`)}
      >
        <ArrowBackIcon /> Back
      </Button>
      <Button
        variantColor="teal"
        variant="outline"
        onClick={() => navigate(`/${current === 3 ? 1 : current + 1}`)}
      >
        Next
        <ArrowForwardIcon />
      </Button>
    </Flex>
  );

  return (
    <>
      <Container maxW={"container.xl"}>
        {!data ? (
          <Spinner />
        ) : (
          <>
            <Heading
              variant="heading"
              fontSize="3xl"
              textAlign={"center"}
              mt={10}
            >
              Reward Assessment
            </Heading>
            <TableContainer mt={10}>
              <Table variant="simple" size={"lg"}>
                <TableCaption color="gray.500">
                  The table to reflect a single customer's reward points
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Transaction Id</Th>
                    <Th>Date</Th>
                    <Th>Purchases</Th>
                    <Th>Price</Th>
                    <Th>Quantity</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.purchases.map(
                    ({
                      price,
                      quantity,
                      itemName,
                      itemId,
                      transactionId,
                      transactionDate,
                    }) => (
                      <Tr key={itemId}>
                        <Td>{transactionId}</Td>
                        <Td>
                          {new Date(transactionDate * 1000).toDateString()}
                        </Td>
                        <Td>{itemName}</Td>
                        <Td>${price}</Td>
                        <Td>{quantity}</Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table variant="striped" size={"lg"}>
                <Tbody>
                  <Tr>
                    <Td>Total Amount Spent: </Td>
                    <Td>${data.spent}</Td>
                  </Tr>
                  <Tr>
                    <Td>Points earned for {convertMonths(current)} :</Td>
                    <Td>{data.points} points</Td>
                  </Tr>
                  <Tr>
                    <Td>Total Points [3 Months]:</Td>
                    <Td>{data.totalPoints} points</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            {ButtonComponent()}
          </>
        )}
      </Container>
    </>
  );
};

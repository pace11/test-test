import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      try {
        const response = await Axios.get("https://simpeg-be.vercel.app/api/v2/notes");
        setNotes(response?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchingData();
  }, []);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
              Add Notes
            </Button>
          </Flex>
          <Flex>
            {isLoading && !isError ? (
              <Spinner />
            ) : (
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {notes?.data?.map((item) => (
                  <GridItem key={item.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                      <CardFooter justify="space-between" flexWrap="wrap">
                        <Button
                          onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          flex="1"
                          colorScheme="red"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            )}
            {isError && (
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            )}
          </Flex>
        </Box>
      </LayoutComponent>
    </>
  );
}

// export async function getStaticProps() {
//   try {
//     const response = await fetch("https://simpeg-be.vercel.app/api/v2/notes");
//     const notes = await response.json();
//     return { props: { notes }, revalidate: 10 };
//   } catch (error) {
//     return { props: { notes: null } };
//   }
// }

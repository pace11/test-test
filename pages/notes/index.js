// eslint-disable-next-line import/order
import { useMutation } from "@/hooks/useMutation";
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
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const router = useRouter();
  // const {
  //   data: listNotes,
  //   isLoading,
  //   isError,
  // } = useQueries({
  //   prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
  // });
  const { mutate } = useMutation();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: listNotes,
    error: isError,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/notes`, fetcher, {
    // revalidateOnFocus: true,
    refreshInterval: 3,
  });

  const handleDelete = async (id) => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/notes/delete/${id}`,
      method: "DELETE",
    });
    if (response?.success) {
      router.reload();
    }
  };

  return (
    <LayoutComponent metaTitle="Notes">
      <Box padding="5">
        <Flex justifyContent="end">
          <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
            Add Notes
          </Button>
        </Flex>
        <Flex>
          {isLoading && !isError ? (
            <Spinner />
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {listNotes?.data?.map((item) => (
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

import {
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const router = useRouter();
  const { id } = router.query;
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const HandleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/update/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(notes),
        }
      );
      const result = await response.json();
      if (result?.success) {
        setSubmitLoading(false);
        router.push("/notes");
      }
    } catch (error) {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    async function fetchingData(notesId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${notesId}`
        );
        const detailNotes = await response.json();
        setNotes({
          title: detailNotes?.data?.title,
          description: detailNotes?.data?.description,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    if (id) fetchingData(id);
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {isLoading ? (
          <Spinner />
        ) : (
          <Card margin="5" padding="5">
            <Heading>Edit Notes</Heading>
            <Grid gap="5">
              <GridItem>
                <Text>Title</Text>
                <Input
                  value={notes.title}
                  type="text"
                  onChange={(event) =>
                    setNotes({ ...notes, title: event.target.value })
                  }
                />
              </GridItem>
              <GridItem>
                <Text>Description</Text>
                <Textarea
                  value={notes.description}
                  onChange={(event) =>
                    setNotes({ ...notes, description: event.target.value })
                  }
                />
              </GridItem>
              <GridItem>
                <Button
                  isLoading={submitLoading}
                  onClick={() => HandleSubmit()}
                  colorScheme="blue"
                >
                  Submit
                </Button>
              </GridItem>
            </Grid>
          </Card>
        )}
      </LayoutComponent>
    </>
  );
}

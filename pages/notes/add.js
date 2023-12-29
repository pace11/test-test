import {
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const HandleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/notes/add", {
        method: "POST",
        body: JSON.stringify(notes),
      });
      const result = await response.json();
      if (result?.success) {
        setSubmitLoading(false);
        router.push("/notes");
      }
    } catch (error) {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Add Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Button isLoading={submitLoading} onClick={() => HandleSubmit()} colorScheme="blue">
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}

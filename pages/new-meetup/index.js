import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NewMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    // enteredMeetupData below
    // address: "123123"
    // description: "123123"
    // image: "https://i.picsum.photos/id/80/200/300.jpg?hmac=E17wxAwPZDltWlMAMl8NBTC-sOsxGW2in2bAtCUFNl4"
    // title: "12312"

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

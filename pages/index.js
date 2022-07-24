import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";

export default function HomePage({ meetups }) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // // Note: useEffect renders AFTER component renders, therefore the component
  // // renders twice, once at the start and once after useEffect
  // useEffect(() => {
  //   // send http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  // no longer need useState and useEffect if static site generating
  return (
    <>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a list of locations to meet up!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

// special exported function only works in page components, this function can be
// async; code written here will never end up client side
export async function getStaticProps() {
  // will not end up in client-side bundle
  const uri = process.env.MONGODB_CONNECT;
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // const res = await fetch("urldata");
  // const data = await res.json();

  // returns an object to destructure in the HomePage() component
  // props.data or {data}

  // regenerate pre-rendered pages with revalidate: 10 seconds meaning as long
  // as there are requests for this page the pre-rendered pages will be
  // regenerated every 10 seconds so the data is never older than 10 seconds
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
}

// regenerates every request can slow page loading, only really used if need
// data constantly every second or if you need req/res objects
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

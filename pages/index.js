import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
   </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events: events.slice(0,3) },
    revalidate: 1 // If the data is changed then update after 1 second
  }
}

  // getServerSideProps runs everytime we come to the page
  // getStaticProps only runs on build time. If someone adds an event,
  // it will not show when they reload the page as this doesn't run
  // on every request
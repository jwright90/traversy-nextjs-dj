import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import Pagination from '@/components/Pagination'

const PER_PAGE = 2

export default function HomePage({ events, page, total }) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />

   </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total number of events
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()
  
  // Fetch events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
  }
}

  // getServerSideProps runs everytime we come to the page
  // getStaticProps only runs on build time. If someone adds an event,
  // it will not show when they reload the page as this doesn't run
  // on every request
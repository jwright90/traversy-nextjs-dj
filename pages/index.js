import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      <Link href="/about">About</Link>
   </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()


  return {
    props: { events },
    revalidate: 1 // If the data is changed then update after 1 second
  }
}

  // getServerSideProps runs everytime we come to the page
  // getStaticProps only runs on build time. If someone adds an event,
  // it will not show when they reload the page as this doesn't run
  // on every request
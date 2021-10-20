import { useRouter } from 'next/router'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import Layout from '@/components/Layout';

export default function EventPage({evt}) {

  return (
    <Layout>
      <h1>{evt.name}</h1>

    </Layout>
  )
}


export async function getServerSideProps({ query: { slug }}) {

  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()

  console.log(events)

  return {
    props: {
      evt: events[0]
    },
  }
}


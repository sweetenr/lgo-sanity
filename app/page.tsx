import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'

import { client } from '@/sanity/client'

const POSTS_QUERY = `*[
  _type == "splash"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body}`

const options = { next: { revalidate: 30 } }

export default async function IndexPage() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

    return (
        <main className='flex items-center justify-center h-screen bg-gray-100'>
            <ul className='flex flex-col gap-y-4'>
                {posts.map((post) => (
                    <li key={post._id}>
                        <Link href={`/`}>
                            <h2 className='text-xl font-semibold text-amber-950'>
                                {post.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}

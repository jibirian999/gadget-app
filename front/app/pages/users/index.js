import Layout, { siteTitle } from '@/components/layout'
import Pagination from '@/components/pagination'
import UserFeed from '@/components/userFeed'
import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Users(props) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_USERS
  const [pageIndex, setPageIndex] = useState(1)
  const { data, error, isLoading } = useSWR(`${API_ENDPOINT}?paged=${pageIndex}`, fetcher, {
    keepPreviousData: true,
  })

  if (error) return <div>failed to load</div>

  if (data || isLoading) {
    return (
      <Layout user={props.user} pageName={'users'}>
        <Head>
          <title>{siteTitle} | ユーザー一覧</title>
        </Head>
        <div className='row justify-content-center'>
          <div className='col-10 text-center'>
            <div className='mt-3'>
              <UserFeed data={data} />
            </div>
          </div>
        </div>
        <div className='pagination'>
          {data?.users.length > 0 ? (
            <Pagination data={data} pageIndex={pageIndex} setPageIndex={setPageIndex} />
          ) : (
            <p>登録されているユーザーはまだいません</p>
          )}
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps = async (context) => {
  const cookie = context.req?.headers.cookie
  const response = await axios.get('http://back:3000/api/v1/check', {
    headers: {
      cookie: cookie,
    },
  })

  const user = await response.data.user

  return { props: { user: user } }
}

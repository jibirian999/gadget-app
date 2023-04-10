import Community from '@/components/community'
import Pagination from '@/components/pagination'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function UserCommunities(props) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_USERS
  const [pageIndex, setPageIndex] = useState(1)
  const { data, error, isLoading } = useSWR(
    `${API_ENDPOINT}/${props.pageUser.id}/user_communities?paged=${pageIndex}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  )

  const router = useRouter()
  const [message, setMessage] = useState([router.query.message])
  const [status, setStatus] = useState(router.query.status)

  // 最新の件数を取得
  const recordCount = data?.pagination.total_count
  useEffect(() => {
    if (recordCount) {
      props.setUserCommunityCount(recordCount)
    }
  }, [])

  if (error) return <div>failed to load</div>

  if (data || isLoading) {
    return (
      <div>
        <ToastContainer />
        <div className='row justify-content-center'>
          <div className='community row justify-content-center'>
            {data?.communities.map((community) => {
              return <Community key={community.id} community={community} user={props.currentUser} />
            })}
          </div>
        </div>
        <div className='pagination'>
          {data?.communities.length > 0 ? (
            <Pagination data={data} pageIndex={pageIndex} setPageIndex={setPageIndex} />
          ) : (
            <p>参加しているコミュニティはありません</p>
          )}
        </div>
        {props.isMyPage ? (
          <div className='new-page-link'>
            <Link href='/communities/new'>
              <FontAwesomeIcon className='pe-2' icon={faCirclePlus} />
              新しいコミュニティを登録する
            </Link>
          </div>
        ) : null}
      </div>
    )
  }
}
import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import apiClient from '@/utils/apiClient'

export default function CommunityMembership(props) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_COMMUNITIES

  const router = useRouter()
  const isInitialRendered = useRef(true)
  const [message, setMessage] = useState([])
  const [status, setStatus] = useState()
  const [isJoined, setIsJoined] = useState(
    props.community.memberships.some((membership) => membership.user_id === props.user?.id),
  )

  const handleClick = async (e, communityId) => {
    try {
      let response
      if (isJoined) {
        response = await apiClient.delete(`${API_ENDPOINT}/${communityId}/memberships`, {
          data: { community_id: communityId },
          withCredentials: true,
        })
      } else {
        response = await apiClient.post(
          `${API_ENDPOINT}/${communityId}/memberships`,
          {
            community_id: communityId,
          },
          { withCredentials: true },
        )
      }
      const resMessage = await response.data.message
      const resStatus = await response.data.status
      const resJoined = await response.data.joined
      const resCount = await response.data.count
      setMessage(resMessage)
      setStatus(resStatus)
      setIsJoined(resJoined)
      props.setMembershipCount(resCount)
      // コミュニティ詳細ページで実行した場合は、member一覧を更新する
      if (props.swrKey) {
        props.mutate(props.swrKey)
      }
    } catch (error) {
      setStatus('failure')
      if (error.response) {
        setMessage(error.response.errorMessage)
      } else if (error.request) {
        setMessage(error.request.errorMessage)
      } else {
        setMessage(error.errorMessage)
      }
    }
  }

  useEffect(() => {
    // 初回レンダリング時には実行しない
    if (isInitialRendered.current) {
      isInitialRendered.current = false
      return
    }

    if (status === 'notLoggedIn') {
      router.push(
        {
          pathname: '/login',
          query: { message: message, status: status },
        },
        '/login',
      )
    }
  }, [status])

  return (
    <>
      <div className='text-center m-4'>
        <p>
          <span
            className={`btn ${isJoined ? 'btn-destroy' : 'btn-create'}`}
            onClick={(event) => handleClick(event, props.community.id)}
          >
            {isJoined ? '脱退' : '参加'}
          </span>
        </p>
      </div>
    </>
  )
}

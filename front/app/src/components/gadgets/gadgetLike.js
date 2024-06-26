import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

import apiClient from '@/utils/apiClient'
import 'react-toastify/dist/ReactToastify.css'

export default function GadgetLike(props) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_GADGETS

  const router = useRouter()
  const isInitialRendered = useRef(true)
  const [message, setMessage] = useState([])
  const [status, setStatus] = useState()
  const [likeCount, setLikeCount] = useState(props.gadget.gadget_likes.length)
  const [isLiked, setIsLiked] = useState(
    props.gadget.gadget_likes.some((like) => like.user_id === props.user?.id),
  )

  const handleClick = async (e, gadgetId) => {
    try {
      let response
      if (isLiked) {
        response = await apiClient.delete(`${API_ENDPOINT}/${gadgetId}/gadget_likes`, {
          data: { gadget_id: gadgetId },
          withCredentials: true,
        })
      } else {
        response = await apiClient.post(
          `${API_ENDPOINT}/${gadgetId}/gadget_likes`,
          {
            gadget_id: gadgetId,
          },
          { withCredentials: true },
        )
      }
      const resMessage = await response.data.message
      const resStatus = await response.data.status
      const resCount = await response.data.count
      const resLiked = await response.data.liked
      setMessage(resMessage)
      setStatus(resStatus)
      setLikeCount(resCount)
      setIsLiked(resLiked)
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

    // errorをcatchした場合
    if (status === 'failure') {
      // Statusを初期化
      setStatus()
      // エラーメッセージを表示
      toast.error(`${message}`.replace(/,/g, '\n'), {
        position: 'top-center',
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message',
      })
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
      <FontAwesomeIcon
        className={isLiked ? 'icon-delete' : 'icon-post'}
        icon={faHeart}
        onClick={(event) => handleClick(event, props.gadget.id)}
        data-testid={`gadget_like_icon_${props.gadget.id}`}
      />
      <span data-testid={`gadget_like_count_${props.gadget.id}`}>{likeCount}</span>
    </>
  )
}

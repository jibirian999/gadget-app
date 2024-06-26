import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer } from 'react-toastify'

import Layout, { siteTitle } from '@/components/common/layout'
import UserCommunities from '@/components/communities/userCommunities'
import UserBookmarkGadgets from '@/components/gadgets/userBookmarkGadgets'
import UserGadgets from '@/components/gadgets/userGadgets'
import UserBookmarkTweets from '@/components/tweets/userBookmarkTweets'
import UserTweets from '@/components/tweets/userTweets'
import UserRelationship from '@/components/users/userRelationship'
import apiClient from '@/utils/apiClient'

import 'easymde/dist/easymde.min.css'
import 'highlight.js/styles/github.css'

import 'react-toastify/dist/ReactToastify.css'

export default function User(props) {
  // ログインユーザー自身の詳細ページか判定
  const isMyPage = props.currentUser?.id === props.pageUser?.id ? true : false

  const router = useRouter()
  const [message, setMessage] = useState([router.query.message])
  const [status, setStatus] = useState(router.query.status)
  const [replyFormId, setReplyFormId] = useState()

  // 各タブの表示件数
  const [userCommunityCount, setUserCommunityCount] = useState(props.userCount?.community)
  const [userTweetCount, setUserTweetCount] = useState(props.userCount?.tweet)
  const [userBookmarkTweetCount, setUserBookmarkTweetCount] = useState(
    props.userCount?.bookmarkTweet,
  )
  const [userBookmarkGadgetCount, setUserBookmarkGadgetCount] = useState(
    props.userCount?.bookmarkGadget,
  )

  const [followerCount, setFollowerCount] = useState(props.pageUser?.followers.length)

  useEffect(() => {
    // Statusを初期化
    setStatus()

    // 成功メッセージを表示
    if (status === 'success') {
      // フォームを初期化
      replyFormId
        ? document.getElementById(`reply_form_${replyFormId}`)?.reset()
        : document.getElementById('comment_form')?.reset()
      // ReplyFormIdを初期化
      setReplyFormId()

      // 成功メッセージを表示
      toast.success(`${message}`.replace(/,/g, '\n'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message',
      })
    }

    // 失敗メッセージを表示
    if (status === 'failure') {
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

  const [activeTab, setActiveTab] = useState('community_tab')

  const handleClick = (e) => {
    setActiveTab(e.target.id)
  }

  const activeTabContent = () => {
    switch (activeTab) {
      case 'community_tab':
        return (
          <div className='user-communities'>
            <UserCommunities
              pageUser={props.pageUser}
              currentUser={props.currentUser}
              setUserCommunityCount={setUserCommunityCount}
              setMessage={setMessage}
              setStatus={setStatus}
              isMyPage={isMyPage}
            />
          </div>
        )
      case 'user_tweet_tab':
        return (
          <div className='user-tweets'>
            <UserTweets
              pageUser={props.pageUser}
              currentUser={props.currentUser}
              setUserTweetCount={setUserTweetCount}
              setMessage={setMessage}
              setStatus={setStatus}
              setReplyFormId={setReplyFormId}
            />
          </div>
        )
      case 'user_bookmark_tweet_tab':
        return (
          <div className='user-bookmark-tweets'>
            <UserBookmarkTweets
              pageUser={props.pageUser}
              currentUser={props.currentUser}
              setUserBookmarkTweetCount={setUserBookmarkTweetCount}
              setMessage={setMessage}
              setStatus={setStatus}
              setReplyFormId={setReplyFormId}
            />
          </div>
        )
      case 'user_bookmark_gadget_tab':
        return (
          <div className='user-bookmark-gadgets'>
            <UserBookmarkGadgets
              pageUser={props.pageUser}
              currentUser={props.currentUser}
              setUserBookmarkGadgetCount={setUserBookmarkGadgetCount}
              setMessage={setMessage}
              setStatus={setStatus}
              isMyPage={isMyPage}
            />
          </div>
        )
    }
  }

  // サーバーサイドでエラーが発生した場合はエラーメッセージを表示して処理を終了する
  if (props.errorMessage) return props.errorMessage

  return (
    <Layout user={props.currentUser} pageName={`${isMyPage ? 'myPage' : ''}`}>
      <Head>
        <title>
          {siteTitle} | {props.pageUser.name}
        </title>
      </Head>
      <ToastContainer />
      <div className='row justify-content-center'>
        <div className='col-12 col-xl-10'>
          <section className='user-profile'>
            <div>
              <Image
                src={
                  props.pageUser.image.url === 'default.jpg'
                    ? '/images/default.jpg'
                    : props.pageUser.image.url
                }
                width={300}
                height={300}
                alt='user-image'
                className='p-1 m-1'
              />
              <div className='user-name'>{props.pageUser.name}</div>
              <div className='user-job'>{props.pageUser.job}</div>
              {props.pageUser.introduction && (
                <div className='user-introduction'>{props.pageUser.introduction}</div>
              )}
              <div className='user-relationships'>
                <Link href={`/users/${props.pageUser.id}/following`}>
                  {props.pageUser.following.length}フォロー中
                </Link>
                <Link href={`/users/${props.pageUser.id}/followers`}>
                  {followerCount}フォロワー
                </Link>
              </div>
            </div>
          </section>
          {!isMyPage ? (
            <UserRelationship
              pageUser={props.pageUser}
              currentUser={props.currentUser}
              setFollowerCount={setFollowerCount}
              setMessage={setMessage}
              setStatus={setStatus}
            />
          ) : null}
          <UserGadgets
            pageUser={props.pageUser}
            currentUser={props.currentUser}
            setMessage={setMessage}
            setStatus={setStatus}
            isMyPage={isMyPage}
          />
        </div>
      </div>
      <div className='row'>
        <ul id='user_tab' className='nav nav-tabs user-tab' role='tablist'>
          <li className='col-3' role='presentation'>
            <button
              type='button'
              id='community_tab'
              className={`nav-link ${activeTab === 'community_tab' ? 'active' : ''}`}
              onClick={handleClick}
            >
              コミュニティ
              <br />({userCommunityCount})
            </button>
          </li>
          <li className='col-3' role='presentation'>
            <button
              type='button'
              id='user_tweet_tab'
              className={`nav-link ${activeTab === 'user_tweet_tab' ? 'active' : ''}`}
              onClick={handleClick}
            >
              ツイート
              <br />({userTweetCount})
            </button>
          </li>
          <li className='col-3' role='presentation'>
            <button
              type='button'
              id='user_bookmark_tweet_tab'
              className={`nav-link ${activeTab === 'user_bookmark_tweet_tab' ? 'active' : ''}`}
              onClick={handleClick}
            >
              <FontAwesomeIcon className='icon-delete' icon={faBookmark} />
              ツイート
              <br />({userBookmarkTweetCount})
            </button>
          </li>
          <li className='col-3' role='presentation'>
            <button
              type='button'
              id='user_bookmark_gadget_tab'
              className={`nav-link ${activeTab === 'user_bookmark_gadget_tab' ? 'active' : ''}`}
              onClick={handleClick}
            >
              <FontAwesomeIcon className='icon-delete' icon={faBookmark} />
              ガジェット
              <br />({userBookmarkGadgetCount})
            </button>
          </li>
        </ul>
        {activeTabContent()}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    // ログインユーザー情報を取得
    const cookie = context.req?.headers.cookie
    const responseCurrentUser = await apiClient.get(process.env.API_ENDPOINT_CHECK_SESSION, {
      headers: {
        cookie: cookie,
      },
    })
    const currentUser = await responseCurrentUser.data.user

    // ユーザー詳細情報を取得
    const id = context.params.id
    const responseUser = await apiClient.get(`${process.env.API_ENDPOINT_USERS}/${id}`, {
      headers: {
        cookie: cookie,
      },
    })

    const pageUser = await responseUser.data.user
    const userCount = await responseUser.data.userCount

    return { props: { currentUser: currentUser, pageUser: pageUser, userCount: userCount } }
  } catch (error) {
    // エラーに応じたメッセージを取得する
    let errorMessage = ''

    if (error.response) {
      errorMessage = error.response.errorMessage
    } else if (error.request) {
      errorMessage = error.request.errorMessage
    } else {
      errorMessage = error.errorMessage
    }

    return { props: { errorMessage: errorMessage } }
  }
}

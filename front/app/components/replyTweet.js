import TweetDelete from '@/components/tweetDelete'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

export default function ReplyTweet(props) {
  return (
    <div className={'reply'}>
      <div className='post' id={`tweet_${props.tweet.id}`}>
        <div className='tweet-section-left'>
          <div className='user-info'>
            <Image
              src={
                props.tweet.user.image.url == 'default.jpg'
                  ? '/images/default.jpg'
                  : `https://static.gadgetlink-app.com${props.tweet.user.image.url}`
              }
              width={150}
              height={150}
              alt='user-image'
            />
            <div className='user'>
              <Link href={`users/${props.tweet.user}`}>{props.tweet.user.name}</Link>：
              {props.tweet.id}
            </div>
          </div>
        </div>
        <div className='post-content tweet-section-right'>
          <div className='tweet-icons'>
            <span className='tweet-icon'>
              {formatDistanceToNow(new Date(props.tweet.created_at), {
                addSuffix: true,
                locale: ja,
              })}
            </span>
            {props.user && props.tweet.user_id === props.user.id ? (
              <TweetDelete
                tweet={props.tweet}
                mutate={props.mutate}
                swrKey={props.swrKey}
                setMessage={props.setMessage}
                setStatus={props.setStatus}
              />
            ) : null}
          </div>
          <div className='horizontal-rule'></div>
          <div className='p-2'>
            <span className='content text-break'>{props.tweet.content}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

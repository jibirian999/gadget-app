import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { toast, ToastContainer } from 'react-toastify'

import Layout, { siteTitle } from '@/components/common/layout'
import MarkdownEditor from '@/components/gadgets/markdownEditor'
import apiClient from '@/utils/apiClient'

import 'react-toastify/dist/ReactToastify.css'

const pageTitle = 'ガジェット編集'

export default function Edit(props) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_GADGETS

  const categories = [
    '',
    'PC本体',
    'オーディオ',
    'キーボード',
    'スマートウォッチ',
    'スマートフォン',
    'スマート家電',
    'タブレット',
    'チェア',
    'デスク',
    'ノートパソコン',
    'マウス',
    'モニター',
    '充電器',
    'その他',
  ]

  // 引用の'>'を復元
  const originalReview = props.gadget?.review?.replace(/&gt;/g, '>')

  const [formData, setFormData] = useState({
    name: `${props.gadget?.name}`,
    category: `${props.gadget?.category}`,
    model_number: `${props.gadget?.model_number}`,
    manufacturer: `${props.gadget?.manufacturer}`,
    price: `${props.gadget?.price ? props.gadget.price : ''}`,
    other_info: `${props.gadget?.other_info}`,
    review: `${originalReview}`,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    e.target.name === 'image'
      ? setFormData({ ...formData, [name]: files[0] })
      : setFormData({ ...formData, [name]: value })
  }

  const router = useRouter()
  const [message, setMessage] = useState([router.query.message])
  const [status, setStatus] = useState(router.query.status)
  const [id, setId] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await apiClient.patch(
        `${API_ENDPOINT}/${props.gadget?.id}`,
        { gadget: formData },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      const resMessage = await response.data.message
      const resStatus = await response.data.status
      const resId = await response.data.id
      setMessage(resMessage)
      setStatus(resStatus)
      setId(resId)
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
    if (status === 'success') {
      router.push(
        {
          pathname: `/gadgets/${id}`,
          query: { message: message, status: status },
        },
        `/gadgets/${id}`,
      )
      setMessage([])
      setStatus()
    }

    // 更新処理が失敗した場合
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

    // 非ログイン時はログイン画面へ遷移
    if (!props.errorMessage && !props.user) {
      router.push(
        {
          pathname: '/login',
          query: { message: 'ログインしてください', status: 'notLoggedIn' },
        },
        '/login',
      )
    }
  }, [status])

  // サーバーサイドでエラーが発生した場合はエラーメッセージを表示して処理を終了する
  if (props.errorMessage) return props.errorMessage

  return (
    <>
      <Layout user={props.user} pageName={'gadget'}>
        <Head>
          <title>{`${siteTitle} | ${pageTitle}`}</title>
        </Head>
        <ToastContainer />
        <div className='row justify-content-center'>
          <div className='col-12'>
            <form onSubmit={handleSubmit} className='row justify-content-center'>
              <div className='col-lg-8 col-sm-10'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='name'>
                    ガジェット名
                  </label>
                  <span className='required-item'>必須</span>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    onChange={handleChange}
                    value={formData.name}
                    required
                    id='name'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='category'>
                    カテゴリ
                  </label>
                  <span className='required-item'>必須</span>
                  <select
                    type='text'
                    className='form-control'
                    name='category'
                    onChange={handleChange}
                    value={formData.category}
                    required
                    id='category'
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === '' ? '選択してください' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='model_number'>
                    型番
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='model_number'
                    onChange={handleChange}
                    value={formData.model_number}
                    id='model_number'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='manufacturer'>
                    メーカー
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='manufacturer'
                    onChange={handleChange}
                    value={formData.manufacturer}
                    id='manufacturer'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='price'>
                    価格
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    name='price'
                    onChange={handleChange}
                    value={formData.price}
                    id='price'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='other_info'>
                    その他スペック
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='other_info'
                    onChange={handleChange}
                    value={formData.other_info}
                    id='other_info'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='image'>
                    ガジェット画像
                  </label>
                  <input
                    type='file'
                    className='form-control'
                    name='image'
                    onChange={handleChange}
                    value={formData.image?.url}
                    id='image'
                  />
                </div>
              </div>
              <div className='col-12'>
                <MarkdownEditor
                  formData={formData}
                  setFormData={setFormData}
                  initialReview={originalReview}
                />
              </div>
              <div className='col-lg-8 col-sm-10'>
                <div className='text-center m-4'>
                  <p>
                    <input
                      type='submit'
                      name='commit'
                      value='更新する'
                      className='btn btn-create'
                    />
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    // ログインユーザー情報を取得
    const cookie = context.req?.headers.cookie
    const responseUser = await apiClient.get(process.env.API_ENDPOINT_CHECK_SESSION, {
      headers: {
        cookie: cookie,
      },
    })
    const user = await responseUser.data.user

    // ガジェット詳細情報を取得
    const id = context.params.id
    const responseGadget = await apiClient.get(`${process.env.API_ENDPOINT_GADGETS}/${id}`, {
      headers: {
        cookie: cookie,
      },
    })
    const gadget = await responseGadget.data.gadget

    return { props: { user: user, gadget: gadget } }
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

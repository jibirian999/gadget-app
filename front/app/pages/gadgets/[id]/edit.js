import Layout, { siteTitle } from '@/components/layout'
import MarkdownEditor from '@/components/markdownEditor'
import Message from '@/components/message'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const pageTitle = 'ガジェット編集'

export default function Edit(props) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_GADGETS

  // 引用の'>'を復元
  const originalReview = props.gadget.review.body.replace(/&gt;/g, '>')

  const [formData, setFormData] = useState({
    name: `${props.gadget.name}`,
    category: `${props.gadget.category}`,
    model_number: `${props.gadget.model_number}`,
    manufacturer: `${props.gadget.manufacturer}`,
    price: `${props.gadget.price ? props.gadget.price : ''}`,
    other_info: `${props.gadget.other_info}`,
    image: `${props.gadget.image.url}`,
    review: `${originalReview}`,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const router = useRouter()
  const [message, setMessage] = useState([router.query.message])
  const [status, setStatus] = useState(router.query.status)
  const [id, setId] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `${API_ENDPOINT}/${props.gadget.id}`,
        { gadget: formData },
        { withCredentials: true },
      )
      const resMessage = await response.data.message
      const resStatus = await response.data.status
      const resId = await response.data.id
      setMessage(resMessage)
      setStatus(resStatus)
      setId(resId)
    } catch (error) {
      console.log(error)
      console.log('catch error')
    }
  }

  const isInitialRendered = useRef(true)

  useEffect(() => {
    // 初回レンダリング時には実行しない
    if (isInitialRendered.current) {
      isInitialRendered.current = false
      return
    }

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
  }, [status])

  return (
    <>
      <Layout user={props.user} pageName={'gadget'}>
        <Head>
          <title>{`${siteTitle} | ${pageTitle}`}</title>
        </Head>
        <Message message={message} status={status} />
        <div className='row justify-content-center'>
          <div className='col-12'>
            <form onSubmit={handleSubmit} className='row justify-content-center'>
              <div className='col-lg-8 col-sm-10'>
                <div className='mb-3'>
                  <label className='form-label'>ガジェット名</label>
                  <span className='required-item'>必須</span>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>カテゴリ</label>
                  <span className='required-item'>必須</span>
                  <select
                    type='text'
                    className='form-control'
                    name='category'
                    onChange={handleChange}
                    value={formData.category}
                    required
                  >
                    <option value=''>選択してください</option>
                    <option value='PC本体'>PC本体</option>
                    <option value='モニター'>モニター</option>
                    <option value='キーボード'>キーボード</option>
                    <option value='マウス'>マウス</option>
                    <option value='オーディオ'>オーディオ</option>
                    <option value='デスク'>デスク</option>
                    <option value='チェア'>チェア</option>
                    <option value='その他'>その他</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>型番</label>
                  <input
                    type='text'
                    className='form-control'
                    name='model_number'
                    onChange={handleChange}
                    value={formData.model_number}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>メーカー</label>
                  <input
                    type='text'
                    className='form-control'
                    name='manufacturer'
                    onChange={handleChange}
                    value={formData.manufacturer}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>価格</label>
                  <input
                    type='number'
                    className='form-control'
                    name='price'
                    onChange={handleChange}
                    value={formData.price}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>その他スペック</label>
                  <input
                    type='text'
                    className='form-control'
                    name='other_info'
                    onChange={handleChange}
                    value={formData.other_info}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>ガジェット画像</label>
                  <input
                    type='file'
                    className='form-control'
                    name='image'
                    onChange={handleChange}
                    value={formData.image?.url}
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
  // ログインユーザー情報を取得
  const cookie = context.req?.headers.cookie
  const responseUser = await axios.get('http://back:3000/api/v1/check', {
    headers: {
      cookie: cookie,
    },
  })
  const user = await responseUser.data.user

  // ガジェット詳細情報を取得
  const id = context.params.id
  const responseGadget = await axios.get(`http://back:3000/api/v1/gadgets/${id}`, {
    headers: {
      cookie: cookie,
    },
  })
  const gadget = await responseGadget.data.gadget

  return { props: { user: user, gadget: gadget } }
}
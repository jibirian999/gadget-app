import FollowingUsersGadgets from '@/pages/gadgets/followingUsersGadgets'
import '@testing-library/jest-dom'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { SWRConfig } from 'swr'
import { DUMMY_DATA_INDEX, DUMMY_DATA_USER } from './dummyData'

const props = DUMMY_DATA_USER

enableFetchMocks()

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    query: { message: ['initialMessage'], status: 'initialStatus' },
  }),
}))

const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${props.user.id}/following_users_gadgets`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(DUMMY_DATA_INDEX))
    },
  ),
]

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

describe('FollowingUsersGadgets', () => {
  test('ガジェット一覧が正常に表示される', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <FollowingUsersGadgets {...props} />
      </SWRConfig>,
    )

    await waitFor(() => {
      // タブの表示を確認
      const link1 = screen.getByRole('link', { name: '全てのユーザーを表示' })
      const link2 = screen.getByRole('link', { name: 'フォロー中のみ表示' })
      expect(link1).toBeInTheDocument()
      expect(link2).toBeInTheDocument()

      // ガジェット一覧が正常に表示されていることを確認 ヘッダー
      expect(screen.getAllByText('ガジェット名')).toHaveLength(6)
      expect(screen.getAllByText('カテゴリ')).toHaveLength(6)
      expect(screen.getAllByText('型番')).toHaveLength(6)
      expect(screen.getAllByText('メーカー')).toHaveLength(6)
      expect(screen.getAllByText('価格')).toHaveLength(6)
      expect(screen.getAllByText('その他スペック')).toHaveLength(6)
      expect(screen.getAllByText('投稿者')).toHaveLength(5)
      expect(screen.getAllByText('最終更新')).toHaveLength(5)
    })

    // ガジェット一覧が正常に表示されていることを確認 コンテンツ
    // 最初のガジェット
    expect(screen.getByText('gadget_name_test1')).toBeInTheDocument()
    expect(screen.getAllByText('オーディオ')).toHaveLength(2) // 検索フォームの選択肢を含めて2箇所
    expect(screen.getByText('model_number_test1')).toBeInTheDocument()
    expect(screen.getByText('manufacturer_test1')).toBeInTheDocument()
    expect(screen.getByText('¥11,111')).toBeInTheDocument()
    expect(screen.getByText('other_info_test1')).toBeInTheDocument()
    expect(screen.getByText('user_name_test1')).toBeInTheDocument()
    expect(screen.getByText('2023/01/31 16:00')).toBeInTheDocument()

    //最後のガジェット
    expect(screen.getByText('gadget_name_test5')).toBeInTheDocument()
    expect(screen.getAllByText('モニター')).toHaveLength(2) // 検索フォームの選択肢を含めて2箇所
    expect(screen.getByText('model_number_test5')).toBeInTheDocument()
    expect(screen.getByText('manufacturer_test5')).toBeInTheDocument()
    expect(screen.getByText('¥55,555')).toBeInTheDocument()
    expect(screen.getByText('other_info_test5')).toBeInTheDocument()
    expect(screen.getByText('user_name_test4')).toBeInTheDocument()
    expect(screen.getByText('2023/02/28 16:00')).toBeInTheDocument()
  })

  test('検索関連情報が正常に表示される', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <FollowingUsersGadgets {...props} />
      </SWRConfig>,
    )

    await waitFor(() => {
      // 検索アイコンの表示を確認
      expect(screen.getByText('ガジェット検索')).toBeInTheDocument()
      expect(screen.getByText('検索条件をクリア')).toBeInTheDocument()
      // 検索結果の件数が正常に表示されていることを確認
      expect(screen.getByText('該当件数 5件')).toBeInTheDocument()
    })
  })
})

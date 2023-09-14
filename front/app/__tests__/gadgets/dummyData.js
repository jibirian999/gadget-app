export const DUMMY_DATA_INDEX = {
  gadgets: [
    {
      id: 1,
      user_id: 1,
      name: 'gadget_name_test1',
      category: 'オーディオ',
      model_number: 'model_number_test1',
      manufacturer: 'manufacturer_test1',
      price: 11111,
      other_info: 'other_info_test1',
      image: { url: null },
      created_at: '2023-01-01T01:00:00.000+09:00',
      updated_at: '2023-02-01T01:00:00.000+09:00',
      review: {
        id: 1,
        name: 'review',
        body: '# ○○の特徴\nこのガジェットの特徴は...\n\n# 導入のきっかけ\n○○の作業を効率化するため...\n\n# イイところ\n## ①\n独自のキー配列により、ホームポジションを崩さずタイピングが...\n## ②\nキーマップのカスタマイズが自由にでき...\n## ③\n無駄を削ぎ落としたデザインで...\n\n# イマイチなところ\n## ①\n慣れるまでに少し時間が...\n## ②\n価格が高く導入にハードルが...',
        record_type: 'Gadget',
        record_id: 1,
        created_at: '2023-01-01T01:00:00.000+09:00',
        updated_at: '2023-01-01T01:00:00.000+09:00',
      },
      user: {
        id: 1,
        name: 'user_name_test1',
        email: 'email_test1@gmail.com',
        job: 'IT系',
        image: {
          url: null,
        },
        created_at: '2023-01-01T00:00:00.000+09:00',
        updated_at: '2023-01-01T00:00:00.000+09:00',
        password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
        remember_digest: null,
      },
      gadget_likes: [
        {
          id: 1,
          user_id: 2,
          gadget_id: 1,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      gadget_bookmarks: [
        {
          id: 1,
          user_id: 2,
          gadget_id: 1,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      review_requests: [
        {
          id: 1,
          user_id: 2,
          gadget_id: 1,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
    },
    {
      id: 2,
      user_id: 2,
      name: 'gadget_name_test2',
      category: 'PC本体',
      model_number: 'model_number_test2',
      manufacturer: 'manufacturer_test2',
      price: 10000,
      other_info: 'other_info_test2',
      image: { url: null },
      created_at: '2023-01-01T01:00:00.000+09:00',
      updated_at: '2023-01-01T01:00:00.000+09:00',
      review: {
        id: 2,
        name: 'review',
        body: '# ○○の特徴\nこのガジェットの特徴は...\n\n# 導入のきっかけ\n○○の作業を効率化するため...\n\n# イイところ\n## ①\n独自のキー配列により、ホームポジションを崩さずタイピングが...\n## ②\nキーマップのカスタマイズが自由にでき...\n## ③\n無駄を削ぎ落としたデザインで...\n\n# イマイチなところ\n## ①\n慣れるまでに少し時間が...\n## ②\n価格が高く導入にハードルが...',
        record_type: 'Gadget',
        record_id: 2,
        created_at: '2023-01-01T01:00:00.000+09:00',
        updated_at: '2023-01-01T01:00:00.000+09:00',
      },
      user: {
        id: 2,
        name: 'user_name_test2',
        email: 'email_test2@gmail.com',
        job: 'IT系',
        image: {
          url: null,
        },
        created_at: '2023-01-01T00:00:00.000+09:00',
        updated_at: '2023-01-01T00:00:00.000+09:00',
        password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
        remember_digest: null,
      },
      gadget_likes: [
        {
          id: 2,
          user_id: 2,
          gadget_id: 2,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      gadget_bookmarks: [
        {
          id: 2,
          user_id: 2,
          gadget_id: 2,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      review_requests: [
        {
          id: 2,
          user_id: 2,
          gadget_id: 2,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
    },
    {
      id: 3,
      user_id: 2,
      name: 'gadget_name_test3',
      category: 'PC本体',
      model_number: 'model_number_test3',
      manufacturer: 'manufacturer_test3',
      price: 10000,
      other_info: 'other_info_test3',
      image: { url: null },
      created_at: '2023-01-01T01:00:00.000+09:00',
      updated_at: '2023-01-01T01:00:00.000+09:00',
      review: {
        id: 3,
        name: 'review',
        body: '# ○○の特徴\nこのガジェットの特徴は...\n\n# 導入のきっかけ\n○○の作業を効率化するため...\n\n# イイところ\n## ①\n独自のキー配列により、ホームポジションを崩さずタイピングが...\n## ②\nキーマップのカスタマイズが自由にでき...\n## ③\n無駄を削ぎ落としたデザインで...\n\n# イマイチなところ\n## ①\n慣れるまでに少し時間が...\n## ②\n価格が高く導入にハードルが...',
        record_type: 'Gadget',
        record_id: 3,
        created_at: '2023-01-01T01:00:00.000+09:00',
        updated_at: '2023-01-01T01:00:00.000+09:00',
      },
      user: {
        id: 2,
        name: 'user_name_test2',
        email: 'email_test2@gmail.com',
        job: 'IT系',
        image: {
          url: null,
        },
        created_at: '2023-01-01T00:00:00.000+09:00',
        updated_at: '2023-01-01T00:00:00.000+09:00',
        password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
        remember_digest: null,
      },
      gadget_likes: [
        {
          id: 3,
          user_id: 3,
          gadget_id: 3,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      gadget_bookmarks: [
        {
          id: 3,
          user_id: 3,
          gadget_id: 3,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      review_requests: [
        {
          id: 3,
          user_id: 3,
          gadget_id: 3,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
    },
    {
      id: 4,
      user_id: 3,
      name: 'gadget_name_test4',
      category: 'PC本体',
      model_number: 'model_number_test4',
      manufacturer: 'manufacturer_test4',
      price: 10000,
      other_info: 'other_info_test4',
      image: { url: null },
      created_at: '2023-01-01T01:00:00.000+09:00',
      updated_at: '2023-01-01T01:00:00.000+09:00',
      review: {
        id: 4,
        name: 'review',
        body: '# ○○の特徴\nこのガジェットの特徴は...\n\n# 導入のきっかけ\n○○の作業を効率化するため...\n\n# イイところ\n## ①\n独自のキー配列により、ホームポジションを崩さずタイピングが...\n## ②\nキーマップのカスタマイズが自由にでき...\n## ③\n無駄を削ぎ落としたデザインで...\n\n# イマイチなところ\n## ①\n慣れるまでに少し時間が...\n## ②\n価格が高く導入にハードルが...',
        record_type: 'Gadget',
        record_id: 4,
        created_at: '2023-01-01T01:00:00.000+09:00',
        updated_at: '2023-01-01T01:00:00.000+09:00',
      },
      user: {
        id: 3,
        name: 'user_name_test3',
        email: 'email_test3@gmail.com',
        job: 'IT系',
        image: {
          url: null,
        },
        created_at: '2023-01-01T00:00:00.000+09:00',
        updated_at: '2023-01-01T00:00:00.000+09:00',
        password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
        remember_digest: null,
      },
      gadget_likes: [
        {
          id: 4,
          user_id: 1,
          gadget_id: 4,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      gadget_bookmarks: [
        {
          id: 4,
          user_id: 1,
          gadget_id: 4,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      review_requests: [
        {
          id: 4,
          user_id: 2,
          gadget_id: 4,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
    },
    {
      id: 5,
      user_id: 4,
      name: 'gadget_name_test5',
      category: 'モニター',
      model_number: 'model_number_test5',
      manufacturer: 'manufacturer_test5',
      price: 55555,
      other_info: 'other_info_test5',
      image: { url: null },
      created_at: '2023-01-01T01:00:00.000+09:00',
      updated_at: '2023-03-01T01:00:00.000+09:00',
      review: {
        id: 5,
        name: 'review',
        body: '# ○○の特徴\nこのガジェットの特徴は...\n\n# 導入のきっかけ\n○○の作業を効率化するため...\n\n# イイところ\n## ①\n独自のキー配列により、ホームポジションを崩さずタイピングが...\n## ②\nキーマップのカスタマイズが自由にでき...\n## ③\n無駄を削ぎ落としたデザインで...\n\n# イマイチなところ\n## ①\n慣れるまでに少し時間が...\n## ②\n価格が高く導入にハードルが...',
        record_type: 'Gadget',
        record_id: 5,
        created_at: '2023-01-01T01:00:00.000+09:00',
        updated_at: '2023-01-01T01:00:00.000+09:00',
      },
      user: {
        id: 4,
        name: 'user_name_test4',
        email: 'email_test4@gmail.com',
        job: 'IT系',
        image: {
          url: null,
        },
        created_at: '2023-01-01T00:00:00.000+09:00',
        updated_at: '2023-01-01T00:00:00.000+09:00',
        password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
        remember_digest: null,
      },
      gadget_likes: [
        {
          id: 5,
          user_id: 2,
          gadget_id: 5,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      gadget_bookmarks: [
        {
          id: 5,
          user_id: 2,
          gadget_id: 5,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
      review_requests: [
        {
          id: 5,
          user_id: 1,
          gadget_id: 5,
          created_at: '2023-01-01T02:00:00.000+09:00',
          updated_at: '2023-01-01T02:00:00.000+09:00',
        },
      ],
    },
  ],
  pagination: { total_count: 10, limit_value: 5, total_pages: 2, current_page: 1 },
}

export const DUMMY_DATA_COMPONENT = {
  gadget: {
    id: 1,
    user_id: 1,
    name: 'gadget_name_test1',
    category: 'オーディオ',
    model_number: 'model_number_test1',
    manufacturer: 'manufacturer_test1',
    price: 11111,
    other_info: 'other_info_test1',
    image: { url: null },
    created_at: '2023-01-01T01:00:00.000+09:00',
    updated_at: '2023-02-01T01:00:00.000+09:00',
    review: {
      id: 1,
      name: 'review',
      body: null,
      record_type: 'Gadget',
      record_id: 1,
      created_at: '2023-01-01T01:00:00.000+09:00',
      updated_at: '2023-01-01T01:00:00.000+09:00',
    },
    user: {
      id: 1,
      name: 'user_name_test1',
      email: 'email_test1@gmail.com',
      job: 'IT系',
      image: {
        url: null,
      },
      created_at: '2023-01-01T00:00:00.000+09:00',
      updated_at: '2023-01-01T00:00:00.000+09:00',
      password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
      remember_digest: null,
    },
    gadget_likes: [
      {
        id: 1,
        user_id: 2,
        gadget_id: 1,
        created_at: '2023-01-01T02:00:00.000+09:00',
        updated_at: '2023-01-01T02:00:00.000+09:00',
      },
    ],
    gadget_bookmarks: [
      {
        id: 1,
        user_id: 2,
        gadget_id: 1,
        created_at: '2023-01-01T02:00:00.000+09:00',
        updated_at: '2023-01-01T02:00:00.000+09:00',
      },
      {
        id: 2,
        user_id: 3,
        gadget_id: 1,
        created_at: '2023-01-01T02:00:00.000+09:00',
        updated_at: '2023-01-01T02:00:00.000+09:00',
      },
    ],
    review_requests: [
      {
        id: 1,
        user_id: 2,
        gadget_id: 1,
        created_at: '2023-01-01T02:00:00.000+09:00',
        updated_at: '2023-01-01T02:00:00.000+09:00',
      },
      {
        id: 2,
        user_id: 3,
        gadget_id: 1,
        created_at: '2023-01-01T02:00:00.000+09:00',
        updated_at: '2023-01-01T02:00:00.000+09:00',
      },
      {
        id: 3,
        user_id: 4,
        gadget_id: 1,
        created_at: '2023-01-01T02:00:00.000+09:00',
        updated_at: '2023-01-01T02:00:00.000+09:00',
      },
    ],
  },
  user: {
    id: 5,
    name: 'user_name_test5',
    email: 'email_test5@gmail.com',
    job: 'IT系',
    image: {
      url: null,
    },
    created_at: '2023-01-01T00:00:00.000+09:00',
    updated_at: '2023-01-01T00:00:00.000+09:00',
    password_digest: '$2a$12$QdZhBzL7xzERxbiQn2Llk.be4ulWWT/m.JcXv3pOHqXd/keLPxhwK',
    remember_digest: null,
  },
}

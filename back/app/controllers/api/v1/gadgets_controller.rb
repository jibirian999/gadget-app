module Api
  module V1
    class GadgetsController < ApplicationController
      before_action :logged_in_user, only: %i[create update destroy]
      before_action :correct_user,   only: %i[update destroy]

      def index
        # 全てのガジェット情報(検索条件があれば一致するもののみ)
        @gadgets = Gadget.filter_by(params)
        # ガジェットのページネーション情報（デフォルトは5件ずつの表示とする）
        paged = params[:paged]
        per = params[:per].presence || 5
        @gadgets_paginated = @gadgets.page(paged).per(per)
        @pagination = pagination(@gadgets_paginated)

        render json: { gadgets: @gadgets_paginated, pagination: @pagination, searchResultCount: @gadgets.count },
               include: %i[user gadget_likes gadget_bookmarks review_requests]
      end

      def user_gadgets
        # 特定のユーザーが登録しているガジェット情報
        user = User.find(params[:id])
        @gadgets = user.gadgets.order(created_at: :desc)
        # ガジェットのページネーション情報（デフォルトは5件ずつの表示とする）
        paged = params[:paged]
        per = params[:per].presence || 5
        @gadgets_paginated = @gadgets.page(paged).per(per)
        @pagination = pagination(@gadgets_paginated)

        render json: { gadgets: @gadgets_paginated, pagination: @pagination },
               include: %i[user gadget_likes gadget_bookmarks review_requests]
      end

      def user_bookmark_gadgets
        # 特定のユーザーがブックマークしているガジェット情報
        user = User.find(params[:id])
        @gadgets = user.bookmarked_gadgets_reordered
        # ガジェットのページネーション情報（デフォルトは5件ずつの表示とする）
        paged = params[:paged]
        per = params[:per].presence || 5
        @gadgets_paginated = @gadgets.page(paged).per(per)
        @pagination = pagination(@gadgets_paginated)

        render json: { gadgets: @gadgets_paginated, pagination: @pagination },
               include: %i[user gadget_likes gadget_bookmarks review_requests]
      end

      def following_users_gadgets
        # ログインユーザーがフォローしているユーザーのガジェット情報(検索条件があれば一致するもののみ)
        user = User.find(params[:id])
        @gadgets = user.following_users_gadgets(params)
        # ガジェットのページネーション情報（デフォルトは5件ずつの表示とする）
        paged = params[:paged]
        per = params[:per].presence || 5
        @gadgets_paginated = @gadgets.page(paged).per(per)
        @pagination = pagination(@gadgets_paginated)

        render json: { gadgets: @gadgets_paginated, pagination: @pagination, searchResultCount: @gadgets.count },
               include: %i[user gadget_likes gadget_bookmarks review_requests]
      end

      def show
        # 表示対象ガジェット
        @gadget = Gadget.find(params[:id])
        render json: { gadget: @gadget },
               include: %i[user comments review_requests gadget_likes gadget_bookmarks]
      end

      def create
        @gadget = current_user.gadgets.build(gadgets_params)
        if @gadget.save
          message = [I18n.t('gadgets.create.flash.success')]
          render json: { status: 'success', message: message, id: @gadget.id }
        else
          message = @gadget.errors.full_messages
          render json: { status: 'failure', message: message, id: @gadget.id }
        end
      end

      def update
        if @gadget.update(gadgets_params)
          message = [I18n.t('gadgets.update.flash.success')]
          render json: { status: 'success', message: message, id: @gadget.id }
        else
          message = @gadget.errors.full_messages
          render json: { status: 'failure', message: message, id: @gadget.id }
        end
      end

      def destroy
        @gadget.destroy
        message = [I18n.t('gadgets.destroy.flash.success')]
        render json: { status: 'success', message: message, isPageDeleted: true }
      end

      private

        def gadgets_params
          params.require(:gadget)
                .permit(:name, :category, :model_number, :manufacturer, :price, :other_info, :image, :review)
        end

        def correct_user
          @gadget = current_user.gadgets.find_by(id: params[:id])
          render json: { status: 'failure', message: [I18n.t('common.correct_user')] } if @gadget.nil?
        end
    end
  end
end

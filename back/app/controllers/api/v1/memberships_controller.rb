module Api
  module V1
    class MembershipsController < ApplicationController
      before_action :logged_in_user, only: %i[create destroy]
      before_action :correct_user,   only: :destroy
      before_action :load_resource

      def show
        # 全てのコミュニティ参加者情報
        @users = @community.joined_members

        render_users_json
      end

      def create
        membership = current_user.memberships.build(community_id: params[:community_id])
        membership.save

        render_membership_status
      end

      def destroy
        @membership.destroy

        render_membership_status
      end

      private

        def correct_user
          @membership = current_user.memberships.find_by(community_id: params[:community_id])
          render json: { status: 'failure', message: [I18n.t('common.correct_user')] } if @membership.nil?
        end

        def load_resource
          @community = Community.find(params[:community_id])
        end

        def render_users_json
          paginate_users

          render json: { users: @paginated_collection, pagination: @pagination_info }
        end

        # 参加ユーザーのページネーション情報を取得（デフォルトは10件ずつの表示とする）
        def paginate_users(limit_value = 10)
          @paginated_collection = paginated_collection(@users, limit_value)
          @pagination_info = pagination_info(@paginated_collection)
        end

        def render_membership_status
          count = @community.memberships.size
          joined = @community.joined_by?(current_user)

          render json: { status: 'success', count: count, joined: joined }
        end
    end
  end
end

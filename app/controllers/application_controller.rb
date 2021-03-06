class ApplicationController < ActionController::Base
  include SessionsHelper

  private

    # ログイン済みユーザーかどうか確認
    def logged_in_user
      return if logged_in?

      store_location
      flash[:danger] = 'ログインしてください'
      respond_to do |format|
        format.html { redirect_to login_path }
        format.js { render js: "window.location = #{login_path.to_json}" }
      end
    end
end

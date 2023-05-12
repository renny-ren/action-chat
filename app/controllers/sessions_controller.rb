class SessionsController < Devise::SessionsController
  def create
    user = User.find_by(username: params[:username])
    if user
      sign_in user
      render status: :ok, json: { user_meta: user.frontend_attributes }
    else
      render status: :unauthorized, json: { message: "username is invalid" }
    end
  end

  def destroy
    sign_out current_user
  end
end

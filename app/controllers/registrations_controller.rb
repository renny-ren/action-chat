class RegistrationsController < Devise::RegistrationsController
  def create
    build_resource(sign_up_params)
    resource.save!
    sign_in(resource_name, resource)
    render status: 200, json: { user_meta: resource.frontend_attributes }
  rescue => e
    render status: 400, json: { message: resource.errors.full_messages }
  end

  private

  def sign_up_params
    params.permit(:nickname, :username)
  end
end

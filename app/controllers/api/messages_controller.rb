module Api
  class MessagesController < ApplicationController
    include PaginationParams

    before_action :set_messages, only: :index

    def index
    end

    private

    def authenticate_user!
      warden.authenticate!
    end

    def set_messages
      @messages = Message.order(created_at: :desc).page(page).per(per)
    end
  end
end

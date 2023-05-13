module Api
  class UsersController < ApplicationController
    def fake_name
      render status: 200, json: { name: FFaker::Name.name }
    end
  end
end

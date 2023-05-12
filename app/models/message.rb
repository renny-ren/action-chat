class Message < ApplicationRecord
  belongs_to :user

  delegate :nickname, to: :user, prefix: true
  delegate :avatar_url, to: :user, prefix: true

  def to_builder
    Jbuilder.new do |message|
      message.(self, :content, :user_id, :user_nickname, :user_avatar_url)
      message.created_at created_at.in_time_zone("Asia/Shanghai").strftime("%H:%M:%S")
    end
  end
end

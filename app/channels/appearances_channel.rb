class AppearancesChannel < ApplicationCable::Channel
  @@subscribers = []

  def subscribed
    stream_from "AppearancesChannel"
    appear_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    disappear_user
    stop_all_streams
  end

  def receive(data)
  end

  def appear_user
    @@subscribers << {
      id: current_user.id,
      nickname: current_user.nickname,
      avatar_url: current_user.avatar_url,
    }
    ActionCable.server.broadcast("AppearancesChannel", { user: current_user, subscribers: @@subscribers.uniq })
  end

  def disappear_user
    @@subscribers.delete_if { |user| user[:id] == current_user.id }
    ActionCable.server.broadcast("AppearancesChannel", { subscribers: @@subscribers.uniq })
  end
end

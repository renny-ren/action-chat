class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ChatChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    @message = current_user.messages.create!(
      content: data["content"],
    )
    ActionCable.server.broadcast("ChatChannel", JSON.parse(@message.to_builder.target!))
  end
end

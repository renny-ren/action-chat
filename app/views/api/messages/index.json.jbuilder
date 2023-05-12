json.messages do
  json.array! @messages.map do |message|
    json.(message, :content, :user_id, :user_nickname, :user_avatar_url)
    json.created_at message.created_at.in_time_zone("Asia/Shanghai").strftime("%H:%M:%S")
  end
end

with_pagination_meta json, @messages

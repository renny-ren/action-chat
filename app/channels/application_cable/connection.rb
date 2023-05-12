module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      verified_user = env["warden"].user
      if verified_user
        verified_user
      else
        # Allow visitors to build connection and read messages in Chatroom
        # reject_unauthorized_connection
        visitor
      end
    end

    def visitor
      Visitor.new
    end
  end
end

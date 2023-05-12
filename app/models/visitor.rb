class Visitor
  def id
    @id ||= SecureRandom.uuid
  end

  def nickname
    @nickname ||= FFaker::Name.name
  end

  def avatar_url
    @avatar_url ||= "https://ui-avatars.com/api/?name=#{nickname}&size=80"
  end
end

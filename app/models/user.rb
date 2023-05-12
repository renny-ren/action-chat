class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages

  validates :username, presence: true, uniqueness: true, length: 2..30
  validates :nickname, presence: true, uniqueness: true
  validates :email, uniqueness: true, allow_blank: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "email is not valid" }

  def avatar_url(size = 80)
    Rails.cache.fetch("user_#{id}_avatar_url", expires_in: 2.hours) do
      "https://ui-avatars.com/api/?name=#{nickname}&size=#{size}"
    end
  end

  def frontend_attributes
    {
      id: id,
      nickname: nickname,
      avatar_url: avatar_url,
    }
  end

  protected

  def email_required?
    false
  end

  def password_required?
    false
  end
end

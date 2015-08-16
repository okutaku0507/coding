# == Schema Information
#
# Table name: codes
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  token      :string(255)      not null
#  code       :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Code < ActiveRecord::Base

  validates :name, :token, presence: true
  validates :token, uniqueness: { case_sensitive: false }

  before_validation do
    self.name ||= "sample code"
    self.token ||= Code.create_salt
  end

  class << self
    def create_salt
      d = Digest::SHA1.new
      now = Time.now
      d.update(now.to_s)
      d.update(String(now.usec))
      d.update(String(rand(0)))
      d.update(String($$))
      d.update('coding')
      d.hexdigest
    end
  end
end

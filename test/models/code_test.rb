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

require 'test_helper'

class CodeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

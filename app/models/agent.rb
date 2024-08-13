class Agent < ApplicationRecord
  belongs_to :user

  validates :api_key, presence: true, uniqueness: true
end

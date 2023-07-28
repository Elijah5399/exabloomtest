class Worksheet < ApplicationRecord
  has_many :questions
  belongs_to :user

  validates :title, presence: true
end

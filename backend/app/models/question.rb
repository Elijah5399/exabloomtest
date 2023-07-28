class Question < ApplicationRecord
    
    belongs_to :worksheet
    validates :description, presence: true
    validates :answer, presence: true

end

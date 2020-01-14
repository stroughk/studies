class Study < ApplicationRecord
    validates :programming_language, presence: true, length: {minimum: 3, maximum: 35 }
    validates :topic, presence: true, length: {minimum: 3, maximum: 35 }
    validates :description, presence: true
end

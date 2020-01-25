class StudySerializer < ActiveModel::Serializer
  has_many :objectives

  attributes :id,:programming_language, :topic, :description
end

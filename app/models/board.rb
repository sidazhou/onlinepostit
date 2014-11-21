class Board < ActiveRecord::Base
  has_many :posts

  validates :url, uniqueness: true
end


class Post < ActiveRecord::Base
  belongs_to :board
  has_many :stickers  
end



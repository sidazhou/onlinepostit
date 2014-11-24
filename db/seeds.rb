srand 1234 #global random seed

# creating boards
board1 = Board.create(url: "url01")
board2 = Board.create(url: "url02")
board3 = Board.create(url: "url03")

# creating posts
5.times {
  FactoryGirl.create :post, board_id: board1.id
}

3.times {
  FactoryGirl.create :post, board_id: board2.id
}

last_post = FactoryGirl.create :post, board_id: board3.id

# look there is a sticker on the last_post, on board3!
FactoryGirl.create :sticker, post_id: last_post.id


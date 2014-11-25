
# Homepage (Root path)
get '/' do
  begin #hack to fix error if cookie is empty
  temp = URI.decode(cookies[:board_history])
  @board_history = JSON.parse(temp)
  rescue
    @board_history = []
  end
  erb :landing_page  
end

get '/goto/random/page' do
  redirect "/#{generate_rand_str}"
end

# Testing ####################
get '/test/history/view' do
  # view cookie 
  "#{cookies[:board_history]}; size: #{cookies[:board_history].length} ; class: #{cookies[:board_history].class}"
end

get '/test/history' do
  append_cookies_board_history(generate_rand_str)
  redirect '/test/history/view'
end
# Testing end ####################



get '/:url' do
  board = Board.find_by(url: params[:url])

  unless board # check if exist
    Board.create(url: params[:url])
  end

begin #hack to fix error if cookie is empty
  temp = URI.decode(cookies[:board_history])
  @board_history = JSON.parse(temp)
rescue
  @board_history = []
end

  append_cookies_board_history(params[:url]) # cookies[:board_history] is ready to use, which is a array of stings, from lest recent to most recent

  erb :index
end

get '/:url/post/get-all' do
    board = Board.find_by(url: params[:url])
    
    if board
      board.posts.to_json
    else
      "[]"
    end
end

#Custom page generate and redirect
post '/:url/post/create' do
  board = Board.find_by(url: params[:url])
  post = board.posts.create(content: params[:content], x: fu_hack(params[:x],"20px"), y: fu_hack(params[:y],"20px"), width: params[:width], height: params[:height]) 

  post.id.to_s
end

post '/goto/custom_url' do 
  custom_url = params[:custom_url]
  redirect "/#{custom_url}"
end

# #redirect to url in history
# post 'goto/board_history_url' do
#   board_history_url = 
#   redirect "/#{board_history_url"}
# end



post '/:url/post/update' do
  # puts "#{params[:url]}"
  # puts params[:width] # content, x, y, width, height
  post = Post.find(params[:id].to_i)
  post.update(content: params[:content], x: fu_hack(params[:x],"20px"), y: fu_hack(params[:y],"20px"), width: params[:width], height: params[:height]) 
end

post '/:url/post/delete' do
  # "#{params[:url]}"
  # "#{params[:id]}"
  post = Post.find(params[:id].to_i)
  post.destroy
end

# Homepage (Root path)
get '/' do
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

  append_cookies_board_history(params[:url]) # cookies[:board_history] is ready to use, which is a array of stings, from lest recent to most recent

  erb :index
end

get '/:url/post/get-all' do
  Post.all.to_json
end


# post '/:url/post/create' do
#   # "#{params[:url]}"
# end


# post '/:url/post/:id/update' do
#   # "#{params[:url]}"
#   # "#{params[:id]}"
# end

# post '/:url/post/:id/delete' do
#   # "#{params[:url]}"
#   # "#{params[:id]}"
# end

# post '/:url/post/:id/sticker/:sticker_id/add' do
#   # "#{params[:url]}"
#   # "#{params[:id]}"
#   # "#{params[:sticker_id]}"
# end



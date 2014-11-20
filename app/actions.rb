# Homepage (Root path)
get '/' do
  redirect "/#{generate_rand_str}"
end

get '/:url' do
  "#{params[:url]}"
  erb :index
end

post '/:url/post/create' do
  # "#{params[:url]}"
end


post '/:url/post/:id/update' do
  # "#{params[:url]}"
  # "#{params[:id]}"
end

post '/:url/post/:id/delete' do
  # "#{params[:url]}"
  # "#{params[:id]}"
end

post '/:url/post/:id/sticker/:sticker_id/add' do
  # "#{params[:url]}"
  # "#{params[:id]}"
  # "#{params[:sticker_id]}"
end




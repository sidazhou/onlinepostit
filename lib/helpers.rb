helpers do
  # http://stackoverflow.com/questions/88311/how-best-to-generate-a-random-string-in-ruby
  def generate_rand_str
    length = 5 # characters
    rand(36**length).to_s(36)
  end

end
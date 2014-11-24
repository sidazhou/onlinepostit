module Helpers
  def generate_rand_str
    length = 5 # characters
    rand(36**length).to_s(36)
  end

end


helpers do
  # http://stackoverflow.com/questions/88311/how-best-to-generate-a-random-string-in-ruby
  include Helpers
    
  def append_cookies_board_history(str)
    # get history
    if cookies[:board_history]
      arr =  JSON.parse(cookies[:board_history])
    else
      arr = []
    end

    # appending to history
    arr <<  str unless arr.include?(str)

    # save only most recent history
    arr = arr.last(3) if arr.size > 3 

    # set history
    response.set_cookie "board_history", arr.to_json
  end
  
  def fu_hack(str,val) # str="30px", val="10px"
    str.slice! ("px") #remove px
    val.slice! ("px") #remove px
    ( str.to_i - val.to_i ).to_s + "px" #return reduced px
  end
end



# @temp = cookies[:board_history] #arr of str


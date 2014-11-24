module Helpers
  def generate_rand_str
    length = 20 # characters
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
    arr = arr.last(5) if arr.size > 5

    # set history
    response.set_cookie "board_history", arr.to_json
  end

  
  def fu_hack(str,val) # str="30px", val="10px"
    if str.nil? # || val.nil?
      return str
    end
    str = str[0..-3].to_i #remove px
    val = val[0..-3].to_i #remove px
    output_str = (str-val).to_s + "px" #return reduced px
    output_str
  end
end



# @temp = cookies[:board_history] #arr of str


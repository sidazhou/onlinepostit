FactoryGirl.define do
  factory :post do
    # board_id ???
    content { Faker::Company.bs }
    x { rand(0..700).to_s + 'px' }
    y { rand(0..500).to_s + 'px' }
    width  { rand(200..300).to_s + 'px' }
    height { rand(150..350).to_s + 'px' }
  end
end
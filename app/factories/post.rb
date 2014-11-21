FactoryGirl.define do
  factory :post do
    # board_id ???
    content { Faker::Company.bs }
    x { rand(0..700) }
    y { rand(0..500) }
    width  { rand(200..300) }
    height { rand(150..350) }
  end
end
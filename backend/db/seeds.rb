user = User.find_or_create_by(username: 'super_admin') do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end

total_worksheet_generated = [0, 1000 - Worksheet.count].max
(0..total_worksheet_generated).each do |count|
  puts "Generation worksheet #{count} / #{total_worksheet_generated} ..."
  Worksheet.where(title: "Title - #{SecureRandom.hex}", description: "Description #{SecureRandom.hex}", user: user, cost: Random.rand.round(6) * 10, price: Random.rand.round(6) * 10).first_or_create!
end
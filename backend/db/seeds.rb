#This file is a seed file, run `rails db:seed` in the backend folder to populate the database with the data defined in it.

user = User.find_or_create_by(username: 'super_admin') do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end

#Modify the worksheet generation to also generate questions
total_worksheet_generated = [0, 1000 - Worksheet.count].max
(0..total_worksheet_generated).each do |count|
  puts "Generation worksheet #{count} / #{total_worksheet_generated} ..."
  worksheet = Worksheet.where(
    title: "Title - #{SecureRandom.hex}", 
    description: "Description #{SecureRandom.hex}", 
    user: user, 
    cost: Random.rand.round(6) * 10, 
    price: Random.rand.round(6) * 10
  ).first_or_create!
  
  #questions generation starts here
  #this segment basically generates 11 questions for each worksheet
  total_questions_generated = [0, 10 - worksheet.questions.count].max

  (0..total_questions_generated).each do |question_count|
    puts "Generating question #{question_count} for worksheet #{count}"
    question_description = "Question #{question_count} for Worksheet #{count}"
    question_answer = "Answer to Question #{question_count}"
    question_cost = Random.rand.round(6) * 10
    worksheet.questions.create(description: question_description, answer: question_answer, cost: question_cost)
  end
end
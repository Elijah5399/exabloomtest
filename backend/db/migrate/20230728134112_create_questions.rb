# This migrate file is used to create a table called questions. Each question stores a description,
# answer, cost, and its associated worksheet's data

class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :description
      t.string :answer
      t.decimal :cost
      t.references :worksheet, null: false, foreign_key: true

      t.timestamps
    end
  end
end

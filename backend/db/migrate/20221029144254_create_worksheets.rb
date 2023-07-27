class CreateWorksheets < ActiveRecord::Migration[6.1]
  def change
    create_table :worksheets do |t|
      t.string :title
      t.references :user, null: false, foreign_key: true
      t.decimal :cost, precision: 8, scale: 2
      t.decimal :price, precision: 10, scale: 2
      t.string :description

      t.timestamps
    end
  end
end

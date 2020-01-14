class CreateStudies < ActiveRecord::Migration[6.0]
  def change
    create_table :studies do |t|
      t.string :programming_language
      t.string :topic
      t.string :description
      t.timestamps
    end
  end
end

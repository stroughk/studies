class CreateObjectives < ActiveRecord::Migration[6.0]
  def change
    create_table :objectives do |t|
      t.string :title
      t.boolean :done
      t.references :study, null: false, foreign_key: true

      t.timestamps
    end
  end
end

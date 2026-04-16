class CreateObjectives < ActiveRecord::Migration[8.1]
  def change
    create_table :objectives do |t|
      t.string :title, null: false
      t.string :period, null: false
      t.text :description

      t.timestamps
    end
  end
end

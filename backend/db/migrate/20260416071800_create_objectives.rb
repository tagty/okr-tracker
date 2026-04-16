class CreateObjectives < ActiveRecord::Migration[8.1]
  def change
    create_table :objectives do |t|
      t.string :title
      t.string :period
      t.text :description

      t.timestamps
    end
  end
end

class CreateCodes < ActiveRecord::Migration
  def change
    create_table :codes do |t|
      t.string :name, null: false
      t.string :token, null: false
      t.text :code

      t.timestamps null: false
    end
  end
end

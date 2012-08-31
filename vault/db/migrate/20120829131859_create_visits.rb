class CreateVisits < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.references :user
      t.references :website
      t.float :rating

      t.timestamps
    end
    add_index :visits, :user_id
    add_index :visits, :website_id
  end
end

class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.references :provider
      t.references :user
      t.string :uid
      t.string :token
      t.string :secret

      t.timestamps
    end
    add_index :services, :provider_id
    add_index :services, :user_id
  end
end

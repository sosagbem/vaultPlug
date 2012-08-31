class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :name
      t.string :logo_url

      t.timestamps
    end
  end
end

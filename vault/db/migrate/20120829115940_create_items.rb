class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.belongs_to :ownable, polymorphic: true
      t.string :forwarding_url
      t.string :perview_image_url
      t.string :preview_text
      t.datetime :original_created_at
      t.references :website

      t.timestamps
    end
    add_index :items, :website_id, [:ownable_id, :ownable_type]
  end
end

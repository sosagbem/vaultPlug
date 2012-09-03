class CreateShortenedUrls < ActiveRecord::Migration
  def change
    create_table :shortened_urls do |t|
      t.references :website
      t.string :url

      t.timestamps
    end
    add_index :shortened_urls, :website_id
  end
end

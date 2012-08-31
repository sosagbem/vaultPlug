class Item < ActiveRecord::Base
  belongs_to :website
  belongs_to  :ownable, polymorphic: true
  attr_accessible :forwarding_url, :original_created_at, :perview_image_url, :preview_text, :website_id

end

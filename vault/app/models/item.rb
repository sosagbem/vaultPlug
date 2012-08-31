class Item < ActiveRecord::Base
  belongs_to :website
  attr_accessible :forwarding_url, :original_created_at, :perview_image_url, :preview_text

end

class Visit < ActiveRecord::Base
  belongs_to :user
  belongs_to :website
  attr_accessible :rating

  def self.ratings
    { rating_image_unselected_url: "/star_empty_64.png", rating_image_selected_url: "/star_filled_gimp.png", number_of_ratings: 5 }
  end
end

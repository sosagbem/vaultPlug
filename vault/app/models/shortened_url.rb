class ShortenedUrl < ActiveRecord::Base
  belongs_to :website
  attr_accessible :url
end

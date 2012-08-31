class Website < ActiveRecord::Base
  attr_accessible :url
  has_many :visits
  has_many :website_comments

  validates :url, uniqueness: true
end

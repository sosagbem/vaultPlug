class Visit < ActiveRecord::Base
  belongs_to :user
  belongs_to :website
  attr_accessible :rating
end

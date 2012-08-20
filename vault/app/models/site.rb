class Site < ActiveRecord::Base
  attr_accessible :url
  recommends :sites
end

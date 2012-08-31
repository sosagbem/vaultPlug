class Provider < ActiveRecord::Base
  attr_accessible :name, :logo_url
  has_many :services
end

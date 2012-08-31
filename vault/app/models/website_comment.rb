class WebsiteComment < Item
  belongs_to  :ownable, polymorphic: true
end

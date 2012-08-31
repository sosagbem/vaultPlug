class Service < ActiveRecord::Base
  belongs_to :provider
  belongs_to :user
  attr_accessible :secret, :token, :uid, :user

  def self.from_omniauth(auth)
    provider = Provider.find_or_create_by_name(auth.provider)
    unless service = provider.services.find_by_uid(auth.uid)
      service = provider.services.create!( uid: auth.uid, token: auth.credentials.token, secret: auth.credentials.secret)
      service.update_attributes!(user: service.create_user!)
    end
    return service
  end

  def post_comment(comment)

  end

end

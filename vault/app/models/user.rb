class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  validates_presence_of   :password, :on => :create, :unless => :joined_account?
  validates_uniqueness_of    :email,     :case_sensitive => false, :allow_blank => true, :if => :email_changed?
  validates_format_of :email, :with  => Devise.email_regexp, :allow_blank => true, :if => :email_changed?
  validates_confirmation_of   :password, :on=>:create
  validates_length_of :password, :within => Devise.password_length, :allow_blank => true

  has_many :services
  has_many :visits
  has_many :websites, through: :visits

  has_many  :website_comments, as: :ownable
  has_many  :vault_comments, as: :ownable

  recommends :sites

  def visit(url)
    visited_website = Website.find_or_create_by_url(url)
    visits.find_or_create_by_website_id(visited_website.id)
  end

private

  def joined_account?
    services.exists?
  end

end

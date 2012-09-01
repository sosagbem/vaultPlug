class ApplicationController < ActionController::Base
  #TODO: fix CSRF shit
  #protect_from_forgery
  def visit_and_get_website(url, rating = nil)
    if current_user
      current_user.visit(url, rating)
    else
      Website.find_or_create_by_url(url)
    end
  end
end

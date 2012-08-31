class WebsiteCommentsController < ApplicationController
  def new
    Rails.logger.info params
  end
end

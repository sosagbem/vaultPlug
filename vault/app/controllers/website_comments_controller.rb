class WebsiteCommentsController < ApplicationController
  def new
    Rails.logger.info params
    @website = visit_and_get_website(params[:url])
    current_user.vault_comments.create!(preview_text: params[:comment], website_id: @website.id ) if current_user
    render json: {response: "good"}
  end

  def index
    @website = visit_and_get_website(params[:url])
    @website_comments = WebsiteComment.where(website_id: @website.id).order("updated_at desc").limit(3)
    render json: @website_comments
  end
end

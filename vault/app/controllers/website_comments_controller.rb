class WebsiteCommentsController < ApplicationController
  def new
    Rails.logger.info params
    @website = visit_and_get_website(params[:url])
    if current_user
      comment = params[:comment]
      current_user.vault_comments.create!(preview_text: comment, website_id: @website.id )
      Provider.all.each do |provider|
        posting_service = provider.services.find_by_user_id(current_user.id) if params[provider.name]
        posting_service.becomes(provider.name.capitalize.constantize).post_comment(comment) if posting_service
      end
    end
    render json: {response: "good"}
  end

  def index
    @website = visit_and_get_website(params[:url])
    @website_comments = WebsiteComment.where(website_id: @website.id).order("updated_at desc").limit(3)
    render json: @website_comments
  end
end

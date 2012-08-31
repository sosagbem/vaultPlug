class WebsitesController < ApplicationController

  def visit
    @website = visit_and_get_website(params[:url])
    Rails.logger.info params
    respond_to do |format|
      format.html { render :json => "response", status: "success" }
    end

  end

end

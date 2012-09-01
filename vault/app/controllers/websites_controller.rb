class WebsitesController < ApplicationController

  #in the next version, this should all be in visits controller
  #currently passing in -1 as default value for rating
  def visit
    @website = visit_and_get_website(params[:url], params[:rating])
    Rails.logger.info params
    respond_to do |format|
      format.html { render :json => "response", status: "success" }
    end
  end

  def ratings
    render json: Visit.ratings
  end

end

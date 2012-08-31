class WebsitesController < ApplicationController

  def visit
    @website = current_user.visit(params[:url]) if current_user
    respond_to do |format|
      format.html { render :json => "response", status: "success" }
    end

  end

end

class SitesController < ApplicationController
  def like
    url = params[:url]
    current_user.like Site.where(url: url) if url
  end

  def dislike
    url = params[:url]
    current_user.dislike Site.where(url: url) if url
  end

  def mark_as_visited
    #only allow binary inputs now
  end

  def get_recommendation
    respond_to do |format|
      format.html
      format.json { render :json => current_user.get_recommendations(1) }
    end
  end
end

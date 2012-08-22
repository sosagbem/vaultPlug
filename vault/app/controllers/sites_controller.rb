class SitesController < ApplicationController
  def like
    vote("like", params[:url])
  end

  def dislike
    vote("dislike", params[:url])
  end

  def mark_as_visited
    #only allow binary inputs now
  end

  def get_recommendation
    respond_to do |format|
      if current_user
        current_user.send :update_similarities
        current_user.send :update_recommendations
        rec = current_user.recommendations(1)
        if rec
          format.json { render :json => current_user.recommendations(1).url }
        else
          format.json { render :json => "No recommendation currently" }
        end
      end
    end
  end

private

  def vote(feeling, url)
    if current_user
      site = Site.find_or_create_by_url(url) if url
      current_user.send(feeling, site) if site
    end
    respond_to do |format|
      format.json { render :json => "Vault" }
    end
  end

end

class Facebook < Service
  def post_comment(comment)
    Rails.logger.info "000000000#{comment}"
    @graph = Koala::Facebook::API.new(token)
    @graph.put_connections("me", "feed", :message => comment)
  end
end

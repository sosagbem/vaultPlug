#doorkeeper_for :all

node(:recommended_url) { current_user.id }

class ProvidersController < ApplicationController
  def index
    @providers = Provider.order("updated_at desc")
    render json: @providers
  end
end

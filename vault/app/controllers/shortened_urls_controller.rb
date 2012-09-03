class ShortenedUrlsController < ApplicationController
  # GET /shortened_urls
  # GET /shortened_urls.json
  def index
    @shortened_urls = ShortenedUrl.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shortened_urls }
    end
  end

  # GET /shortened_urls/1
  # GET /shortened_urls/1.json
  def show
    @shortened_url = ShortenedUrl.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @shortened_url }
    end
  end

  # GET /shortened_urls/new
  # GET /shortened_urls/new.json
  def new
    @shortened_url = ShortenedUrl.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @shortened_url }
    end
  end

  # GET /shortened_urls/1/edit
  def edit
    @shortened_url = ShortenedUrl.find(params[:id])
  end

  # POST /shortened_urls
  # POST /shortened_urls.json
  def create
    @shortened_url = ShortenedUrl.new(params[:shortened_url])

    respond_to do |format|
      if @shortened_url.save
        format.html { redirect_to @shortened_url, notice: 'Shortened url was successfully created.' }
        format.json { render json: @shortened_url, status: :created, location: @shortened_url }
      else
        format.html { render action: "new" }
        format.json { render json: @shortened_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /shortened_urls/1
  # PUT /shortened_urls/1.json
  def update
    @shortened_url = ShortenedUrl.find(params[:id])

    respond_to do |format|
      if @shortened_url.update_attributes(params[:shortened_url])
        format.html { redirect_to @shortened_url, notice: 'Shortened url was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @shortened_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shortened_urls/1
  # DELETE /shortened_urls/1.json
  def destroy
    @shortened_url = ShortenedUrl.find(params[:id])
    @shortened_url.destroy

    respond_to do |format|
      format.html { redirect_to shortened_urls_url }
      format.json { head :no_content }
    end
  end
end

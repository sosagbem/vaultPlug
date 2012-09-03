require 'test_helper'

class ShortenedUrlsControllerTest < ActionController::TestCase
  setup do
    @shortened_url = shortened_urls(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shortened_urls)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create shortened_url" do
    assert_difference('ShortenedUrl.count') do
      post :create, shortened_url: { url: @shortened_url.url }
    end

    assert_redirected_to shortened_url_path(assigns(:shortened_url))
  end

  test "should show shortened_url" do
    get :show, id: @shortened_url
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @shortened_url
    assert_response :success
  end

  test "should update shortened_url" do
    put :update, id: @shortened_url, shortened_url: { url: @shortened_url.url }
    assert_redirected_to shortened_url_path(assigns(:shortened_url))
  end

  test "should destroy shortened_url" do
    assert_difference('ShortenedUrl.count', -1) do
      delete :destroy, id: @shortened_url
    end

    assert_redirected_to shortened_urls_path
  end
end

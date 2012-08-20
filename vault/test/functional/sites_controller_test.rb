require 'test_helper'

class SitesControllerTest < ActionController::TestCase
  test "should get like" do
    get :like
    assert_response :success
  end

  test "should get dislike" do
    get :dislike
    assert_response :success
  end

  test "should get mark_as_visited" do
    get :mark_as_visited
    assert_response :success
  end

  test "should get get_recommendation" do
    get :get_recommendation
    assert_response :success
  end

end

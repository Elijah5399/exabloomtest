class SessionsController < ApplicationController
  
  def create
    user = User.find_by(username: params['user']['username'])
               .try(:authenticate, params['user']['password'])

    result = { status: :not_found } unless user.present?

    if result.nil?
      session[:user_id] = user.id
      result = {
        status: :created,
        logged_in: true
      }
    end

    render json: result
  end
end
class WorksheetsController < ApplicationController
  
  def index
    user = User.find_by(username: params['user']['username'])
                .try(:authenticate, params['user']['password'])

    result = { status: :unauthorized } unless user.present?

    if result.nil?
      result = {
        status: :ok,
        worksheets: user.worksheets
      }
    end

    render json: result
  end
end
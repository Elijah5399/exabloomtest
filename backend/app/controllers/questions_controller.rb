#Here I define an index method which allows anyone to find all the questions associated with a specific worksheet.

class QuestionsController < ApplicationController
    def index
      worksheet = Worksheet.find(params[:id])
      questions = worksheet.questions
      render json: { questions: questions }
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Worksheet not found' }, status: :not_found
    end
  end
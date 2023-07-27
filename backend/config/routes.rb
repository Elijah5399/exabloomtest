Rails.application.routes.draw do
  resources :sessions, only: [:create]
  post 'worksheets/index', to: 'worksheets#index'
end
Rails.application.routes.draw do
  root "top#index"
  resources :codes, only: [ :new ] do
    collection do
      get 'initializer'
    end
  end
  get 'room/:token', to: "codes#room", as: "room"
end

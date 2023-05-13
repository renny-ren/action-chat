Rails.application.routes.draw do
  devise_for :users, controllers: {
                       registrations: :registrations,
                       sessions: :sessions,
                     }, sign_out_via: [:delete, :get]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"

  scope "v1", as: "api", module: "api" do
    resources :messages, only: :index
    resources :users, only: [:show] do
      collection do
        get :fake_name
      end
    end
  end
end

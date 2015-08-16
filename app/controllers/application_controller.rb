class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_code
    if session[:code_id]
      @current_code ||= Code.find_by(id: session[:code_id])
    end
  end
end

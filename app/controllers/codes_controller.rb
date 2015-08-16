class CodesController < ApplicationController
  def new
    code = Code.new(code: "puts 'Hello, world.'")
    if code.save
      session[:code_id] = code.id
      redirect_to room_path(token: code.token)
    else
      flash.alert = "An Error occurred."
      redirect_to :root
    end
  end

  def room
    if params[:token].present?
      if @code = Code.find_by(token: params[:token])
        session[:code_id] = @code.id
        render 'top/room'
      else
        flash.alert = "An Error occurred."
        redirect_to :root
      end
    else
      redirect_to [ :new, :codes ]
    end
  end

  def initializer
    if current_code
      render json: code_to_json, root: nil
    else
      render json: "An Error occurred."
    end
  end

  private
  def code_to_json
    if current_code
      {'code':
        {
          'id': current_code.id,
          'name': current_code.name,
          'token': current_code.token,
          'code': current_code.code
        }
      }
    else
      []
    end
  end
end

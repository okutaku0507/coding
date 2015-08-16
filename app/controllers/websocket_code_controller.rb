# WebsocketRails::BaseControllerを継承

class WebsocketCodeController < WebsocketRails::BaseController

  def code_recieve
    # クライアントからのメッセージを取得
    data = data()
    id = data['id']
    recieve_code = data['code']
    # websocket_chatイベントで接続しているクライアントにブロードキャスト
    if @code = Code.find_by(id: id)
      @code.update_attributes(code: recieve_code)
    end
    broadcast_message("websocket_code", {'id': id, 'code': recieve_code})
  end

end

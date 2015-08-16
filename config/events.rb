WebsocketRails::EventMap.describe do
  subscribe :websocket_code, to: WebsocketCodeController, with_method: :code_recieve
end

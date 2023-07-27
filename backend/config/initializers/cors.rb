Rails.application.config.middleware.insert_before 0, Rack::Cors do
	allow do
		origins 'http://localhost:9090'
		resource '*', headers: :any, methods: [:get, :post]
	end
end

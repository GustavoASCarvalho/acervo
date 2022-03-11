web: ENV_SILENT=true node ./build/server.js
release: node build/ace migration:run --force && node ace db:seed

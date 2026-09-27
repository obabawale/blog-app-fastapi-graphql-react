npm exec -- concurrently \
  "cd fastapi_app && . env/bin/activate && uvicorn app:app --reload" \
  "cd react-frontend && npm start"
concurrently \
  "cd fastapi_app && source env/bin/activate && uvicorn app:app --reload" \
  "cd react-frontend && npm start"
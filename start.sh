# Command to start the frontend and backend servers

# Start the backend server
(cd fastapi_app && source env/bin/activate && uvicorn app:app --reload) & (cd react-frontend && npm install && npm start)
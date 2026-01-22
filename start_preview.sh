#!/bin/bash
export PATH=$(pwd)/node-v20.11.0-darwin-arm64/bin:$PATH

# Ensure build is up to date
echo "Building Alpha Editor..."
npm run build

echo "Starting Preview Server..."
# Run in background
nohup npm run preview -- --host 0.0.0.0 --port 4173 > alpha-editor-preview.log 2>&1 &
echo $! > alpha-editor-preview.pid

echo "Preview server started successfully!"
echo "PID: $(cat alpha-editor-preview.pid)"
echo "Access URL: http://localhost:4173/"
echo "Logs: alpha-editor-preview.log"

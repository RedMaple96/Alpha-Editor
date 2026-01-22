#!/bin/bash
if [ -f alpha-editor-preview.pid ]; then
    PID=$(cat alpha-editor-preview.pid)
    if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        echo "Stopped process $PID"
    else
        echo "Process $PID not running."
    fi
    rm alpha-editor-preview.pid
else
    echo "No PID file found. Checking for process on port 4173..."
    PID=$(lsof -ti :4173)
    if [ -n "$PID" ]; then
        kill $PID
        echo "Stopped process $PID running on port 4173"
    else
        echo "No process found on port 4173."
    fi
fi

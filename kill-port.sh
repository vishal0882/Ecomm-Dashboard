#!/bin/bash

# Script to kill any process running on port 3000

PORT=3000

echo "Checking for processes on port $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ No process found on port $PORT"
    exit 0
fi

echo "Found process(es) on port $PORT:"
lsof -i:$PORT

echo ""
echo "Killing process(es)..."
kill -9 $PID 2>/dev/null

sleep 1

# Verify
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "⚠️  Some processes may still be running. Trying force kill..."
    kill -9 $PID 2>/dev/null
    sleep 1
fi

if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "❌ Failed to free port $PORT"
    echo "Try manually: sudo lsof -ti:$PORT | xargs kill -9"
    exit 1
else
    echo "✅ Port $PORT is now free!"
    echo "You can now run: npm run dev"
fi


#!/bin/bash
export PATH=$(pwd)/node-v20.11.0-darwin-arm64/bin:$PATH
echo "Building Alpha Editor..."
npm run build

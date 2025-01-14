#!/bin/sh

# Get the current directory
current_dir=$(pwd)

# Set src_dir to point to ../src relative to the current directory
src_dir="$(dirname "$current_dir")/src"

# Verify the src_dir path
echo "Source directory: $src_dir"

# Find all folders ending with "-service" in the src directory (full path)
service_folders=($(find "$src_dir" -maxdepth 1 -type d -name '*-service'))

# Loop through the service folders and build Docker images
for service_dir in "${service_folders[@]}"; do
  # Pass the full path to deploy_service.sh
  sh "single_service_deploy.sh" "$service_dir"
  echo "===="
done

echo "All services deployed (except for CloudCheck, run that script seperately)..."

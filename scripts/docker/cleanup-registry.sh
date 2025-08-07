#!/usr/bin/env bash

# DigitalOcean Container Registry Cleanup Script
# This script removes old Docker image tags from the registry to save space
# Retention policy: Keep the last 5 versions and any tags from the last 30 days

set -e

# Configuration
KEEP_LAST_N_TAGS=5
KEEP_DAYS=30
REPOSITORIES=("api" "landing" "sites" "web")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting DigitalOcean Container Registry cleanup...${NC}"

# Function to delete old tags for a repository
cleanup_repository() {
    local repo=$1
    echo -e "\n${YELLOW}Processing repository: $repo${NC}"
    
    # Get all tags sorted by date (newest first)
    tags=$(doctl registry repository list-tags "$repo" --format Tag,UpdatedAt --no-header | sort -k2 -r)
    
    if [ -z "$tags" ]; then
        echo "No tags found for $repo"
        return
    fi
    
    # Convert tags to array
    IFS=$'\n' read -d '' -r -a tag_array <<< "$tags" || true
    
    # Count total tags
    total_tags=${#tag_array[@]}
    echo "Found $total_tags tags in $repo"
    
    if [ $total_tags -le $KEEP_LAST_N_TAGS ]; then
        echo "Repository has $total_tags tags, keeping all (minimum: $KEEP_LAST_N_TAGS)"
        return
    fi
    
    # Calculate cutoff date (30 days ago)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        cutoff_date=$(date -v-${KEEP_DAYS}d +%s)
    else
        # Linux
        cutoff_date=$(date -d "$KEEP_DAYS days ago" +%s)
    fi
    
    tags_to_delete=()
    tags_kept=0
    
    for i in "${!tag_array[@]}"; do
        tag_line="${tag_array[$i]}"
        tag_name=$(echo "$tag_line" | awk '{print $1}')
        tag_date=$(echo "$tag_line" | awk '{print $2}')
        
        # Skip 'latest' tag
        if [ "$tag_name" = "latest" ]; then
            echo "  Keeping: $tag_name (latest tag)"
            continue
        fi
        
        # Keep the first N tags
        if [ $tags_kept -lt $KEEP_LAST_N_TAGS ]; then
            echo "  Keeping: $tag_name (recent version)"
            tags_kept=$((tags_kept + 1))
            continue
        fi
        
        # Parse the date and check if it's within retention period
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            tag_timestamp=$(date -j -f "%Y-%m-%d" "${tag_date:0:10}" +%s 2>/dev/null || echo "0")
        else
            # Linux
            tag_timestamp=$(date -d "${tag_date:0:10}" +%s 2>/dev/null || echo "0")
        fi
        
        if [ "$tag_timestamp" -gt "$cutoff_date" ]; then
            echo "  Keeping: $tag_name (within $KEEP_DAYS days)"
        else
            echo "  Marking for deletion: $tag_name"
            tags_to_delete+=("$tag_name")
        fi
    done
    
    # Delete the tags
    if [ ${#tags_to_delete[@]} -gt 0 ]; then
        echo -e "${RED}Deleting ${#tags_to_delete[@]} old tags from $repo...${NC}"
        doctl registry repository delete-tag "$repo" "${tags_to_delete[@]}" --force
        echo -e "${GREEN}Deleted ${#tags_to_delete[@]} tags from $repo${NC}"
    else
        echo -e "${GREEN}No tags to delete from $repo${NC}"
    fi
}

# Process each repository
for repo in "${REPOSITORIES[@]}"; do
    cleanup_repository "$repo"
done

echo -e "\n${YELLOW}Starting garbage collection to reclaim space...${NC}"
doctl registry garbage-collection start --include-untagged-manifests --force

echo -e "${GREEN}Garbage collection started. Checking status...${NC}"
sleep 5

# Check garbage collection status
gc_status=$(doctl registry garbage-collection get-active --format Status --no-header)
echo "Garbage collection status: $gc_status"

echo -e "\n${GREEN}Registry cleanup completed!${NC}"
echo "To check garbage collection progress, run:"
echo "  doctl registry garbage-collection get-active"
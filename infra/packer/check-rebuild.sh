#!/bin/bash

# Script to check if Packer images need rebuilding
# Usage: ./check-rebuild.sh [app|neo4j|all]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE=${1:-all}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to calculate checksums of source files
calculate_checksums() {
    local image_dir=$1
    local metadata_file="$image_dir/build-metadata.json"
    
    if [ ! -f "$metadata_file" ]; then
        echo "No metadata file found"
        return 1
    fi
    
    # Get list of source files from metadata
    local source_files=$(jq -r ".images.\"$2\".source_files[]" "$metadata_file" 2>/dev/null)
    
    local checksum=""
    cd "$image_dir"
    for file in $source_files; do
        if [ -f "$file" ]; then
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                checksum+=$(shasum -a 256 "$file" | cut -d' ' -f1)
            else
                # Linux
                checksum+=$(sha256sum "$file" | cut -d' ' -f1)
            fi
        fi
    done
    
    echo "$checksum" | shasum -a 256 | cut -d' ' -f1
}

# Function to get DigitalOcean snapshot info
get_do_snapshot_info() {
    local snapshot_name_pattern=$1
    
    if [ -z "$DIGITALOCEAN_TOKEN" ]; then
        # Try to load from .env file
        if [ -f "$SCRIPT_DIR/../../.env" ]; then
            export $(grep -v '^#' "$SCRIPT_DIR/../../.env" | grep DIGITALOCEAN_TOKEN | xargs)
        fi
    fi
    
    if [ -z "$DIGITALOCEAN_TOKEN" ]; then
        echo -e "${YELLOW}Warning: DIGITALOCEAN_TOKEN not set, cannot check remote snapshots${NC}"
        return 1
    fi
    
    # Get latest snapshot matching pattern
    doctl compute snapshot list \
        --format "ID,Name,CreatedAt" \
        --no-header 2>/dev/null | \
        grep "$snapshot_name_pattern" | \
        sort -k3 -r | \
        head -1
}

# Function to check if image needs rebuild
check_image() {
    local image=$1
    local image_dir="$SCRIPT_DIR/$image"
    local metadata_file="$image_dir/build-metadata.json"
    
    echo -e "${BLUE}Checking $image image...${NC}"
    
    # Check if metadata exists
    if [ ! -f "$metadata_file" ]; then
        echo -e "${YELLOW}  ⚠ No metadata file found${NC}"
        echo -e "${YELLOW}  → Rebuild recommended${NC}"
        return 1
    fi
    
    # Calculate current checksum
    local current_checksum=$(calculate_checksums "$image_dir" "${image}-base")
    local stored_checksum=$(jq -r ".images.\"${image}-base\".checksum // \"\"" "$metadata_file")
    
    # Check for changes
    local needs_rebuild=false
    local reasons=()
    
    # 1. Check file changes
    if [ "$current_checksum" != "$stored_checksum" ]; then
        reasons+=("Source files have changed")
        needs_rebuild=true
    fi
    
    # 2. Check last build time (rebuild if older than 30 days)
    local last_built=$(jq -r ".images.\"${image}-base\".last_built // \"\"" "$metadata_file")
    if [ -n "$last_built" ] && [ "$last_built" != "null" ]; then
        local last_built_timestamp=$(date -d "$last_built" +%s 2>/dev/null || date -j -f "%Y-%m-%dT%H:%M:%S" "$last_built" +%s 2>/dev/null || echo 0)
        local current_timestamp=$(date +%s)
        local days_old=$(( (current_timestamp - last_built_timestamp) / 86400 ))
        
        if [ $days_old -gt 30 ]; then
            reasons+=("Image is $days_old days old (>30 days)")
            needs_rebuild=true
        fi
    else
        reasons+=("No build timestamp found")
        needs_rebuild=true
    fi
    
    # 3. Check if snapshot exists in DigitalOcean
    local snapshot_id=$(jq -r ".images.\"${image}-base\".snapshot_id // \"\"" "$metadata_file")
    if [ -n "$snapshot_id" ] && [ "$snapshot_id" != "null" ]; then
        if command -v doctl &> /dev/null; then
            local snapshot_info=$(get_do_snapshot_info "codelab-${image}-base")
            if [ -z "$snapshot_info" ]; then
                reasons+=("Snapshot not found in DigitalOcean")
                needs_rebuild=true
            else
                echo -e "${GREEN}  ✓ Snapshot found: $(echo $snapshot_info | cut -d' ' -f2)${NC}"
            fi
        fi
    fi
    
    # 4. Check dependency versions (if needed)
    # You could add checks for Docker, Consul versions etc.
    
    # Report results
    if [ "$needs_rebuild" = true ]; then
        echo -e "${YELLOW}  ⚠ Rebuild needed:${NC}"
        for reason in "${reasons[@]}"; do
            echo -e "${YELLOW}    - $reason${NC}"
        done
        return 1
    else
        echo -e "${GREEN}  ✓ Image is up to date${NC}"
        if [ -n "$last_built" ] && [ "$last_built" != "null" ]; then
            echo -e "${GREEN}    Last built: $last_built${NC}"
        fi
        return 0
    fi
}

# Function to update metadata after build
update_metadata() {
    local image=$1
    local snapshot_id=$2
    local snapshot_name=$3
    local image_dir="$SCRIPT_DIR/$image"
    local metadata_file="$image_dir/build-metadata.json"
    
    if [ ! -f "$metadata_file" ]; then
        echo -e "${RED}Error: Metadata file not found${NC}"
        return 1
    fi
    
    # Calculate new checksum
    local new_checksum=$(calculate_checksums "$image_dir" "${image}-base")
    
    # Update metadata
    local tmp_file=$(mktemp)
    jq ".images.\"${image}-base\".last_built = \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\" |
        .images.\"${image}-base\".snapshot_id = \"$snapshot_id\" |
        .images.\"${image}-base\".snapshot_name = \"$snapshot_name\" |
        .images.\"${image}-base\".checksum = \"$new_checksum\"" \
        "$metadata_file" > "$tmp_file"
    
    mv "$tmp_file" "$metadata_file"
    echo -e "${GREEN}✓ Metadata updated${NC}"
}

# Main execution
echo -e "${BLUE}=== Packer Image Rebuild Check ===${NC}"
echo ""

rebuild_needed=false

case $IMAGE in
    app)
        check_image "app" || rebuild_needed=true
        ;;
    neo4j)
        check_image "neo4j" || rebuild_needed=true
        ;;
    all)
        check_image "app" || rebuild_needed=true
        echo ""
        check_image "neo4j" || rebuild_needed=true
        ;;
    *)
        echo -e "${RED}Unknown image: $IMAGE${NC}"
        echo "Usage: $0 [app|neo4j|all]"
        exit 1
        ;;
esac

echo ""
if [ "$rebuild_needed" = true ]; then
    echo -e "${YELLOW}=== Action Required ===${NC}"
    echo "Run: ./build.sh prod $IMAGE"
    exit 1
else
    echo -e "${GREEN}=== All images up to date ===${NC}"
    exit 0
fi
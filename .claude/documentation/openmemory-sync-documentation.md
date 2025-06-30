# OpenMemory Sync Documentation

## Overview
This document consolidates all data structures and implementation details for syncing various sources to OpenMemory, providing better integration with Claude Code through MCP (Model Context Protocol).

> **Note**: We've migrated from Mem0 to OpenMemory as it provides better integration with Claude Code through MCP. Schema enforcement is handled through Claude memory patterns rather than building a custom MCP server.

## GitHub Sync

### Data Structure

#### Content Format (Human-Readable)
The content stored in OpenMemory should be formatted for easy human reading:

```
GitHub Issue #3744 in codelab-app/platform
Title: Sync GitHub issues and discussions to OpenMemory with metadata
State: open
Author: webberwang
Created: 2025-06-30
Updated: 2025-06-30
Labels: enhancement, integration, openmemory

## Description
[Full issue body content preserved here]
```

#### Metadata Structure
The metadata enables filtering, searching, and programmatic access:

```json
{
  "github_issue_id": "3187047494",
  "github_repo": "codelab-app/platform",
  "issue_number": 3744,
  "type": "issue",
  "source": "github",
  "state": "open",
  "author": "webberwang",
  "created_at": "2025-06-30T03:58:41Z",
  "updated_at": "2025-06-30T03:58:41Z",
  "labels": ["enhancement", "integration", "openmemory"],
  "url": "https://github.com/codelab-app/platform/issues/3744",
  "node_id": "I_kwDOEPpVzM699nxG"
}
```

### Key Design Principles

1. **Consistent Prefixing**: Start each memory with "GitHub Issue #X in owner/repo" for easy identification
2. **Full Content Preservation**: Include the complete issue body to maintain all context
3. **Structured Metadata**: Use snake_case for metadata fields to match OpenMemory conventions
4. **Unique Identifiers**: Store both GitHub's numeric ID and node_id for future API operations
5. **Human-Readable Dates**: Format dates in content, keep ISO format in metadata
6. **Flexible Type Field**: Can be "issue", "discussion", or "pull_request"

### Differences for Discussions

When syncing discussions, use these modifications:
- `type`: "discussion" 
- `github_discussion_id` instead of `github_issue_id`
- No `assignees` field (discussions don't have assignees)
- No `closed_at` field (discussions don't close like issues)

### Batch Processing Strategy

For syncing GitHub content:
- Process in batches of ~50 issues
- Handle rate limiting between batches
- Track sync status per item
- Continue on individual failures
- Generate summary reports

## Notion Sync

### Data Structure

#### Content Format (Human-Readable)
The content stored in OpenMemory should be formatted for easy human reading:

```
Notion Page: [Page Title]
Database: [Parent Database Name] (if applicable)
Path: [Workspace] > [Parent Page] > [Current Page]
Type: page/database
Last Edited: [Date]
Created: [Date]
Author: [Creator Name]

## Content
[Full page content in markdown format]

## Properties (if database item)
- Property1: Value1
- Property2: Value2
```

#### Metadata Structure
The metadata enables filtering, searching, and programmatic access:

```json
{
  "notion_page_id": "f336d0bc-b841-465b-8045-024475c079dd",
  "notion_workspace": "Codelab Platform",
  "page_title": "Architecture Overview",
  "type": "page",
  "source": "notion",
  "parent_type": "database",
  "parent_id": "database-uuid-here",
  "parent_title": "Technical Documentation",
  "path": ["Codelab Platform", "Technical Documentation", "Architecture Overview"],
  "created_time": "2024-01-15T10:30:00Z",
  "last_edited_time": "2025-06-30T14:22:00Z",
  "created_by": "user-id",
  "last_edited_by": "user-id",
  "url": "https://www.notion.so/Architecture-Overview-f336d0bcb841465b8045024475c079dd",
  "properties": {
    "Tags": ["architecture", "documentation"],
    "Status": "Published",
    "Priority": "High"
  }
}
```

### Key Design Principles

1. **Clear Identification**: Start each memory with "Notion Page: [Title]" for easy identification
2. **Hierarchical Context**: Include the full path to understand page location in workspace
3. **Content Preservation**: Convert Notion blocks to clean markdown format
4. **Database Awareness**: Distinguish between standalone pages and database entries
5. **Property Tracking**: For database items, include all custom properties
6. **Rich Metadata**: Store IDs, timestamps, and relationships for future operations

### Content Type Variations

#### Standalone Pages
- Simple pages not part of any database
- Focus on content and hierarchical location
- May contain child pages references

#### Database Pages
- Pages that are entries in a Notion database
- Include all database properties
- Track parent database information

#### Database Definitions
- The database schema itself
- Include property definitions
- Track views and filters

### Notion Block Type Handling

Convert Notion blocks to markdown equivalents:
- **Text/Paragraph**: Plain markdown text
- **Headings**: Markdown headers (#, ##, ###)
- **Lists**: Markdown lists (-, 1.)
- **Code**: Markdown code blocks with language
- **Images**: Markdown image syntax with URLs
- **Tables**: Markdown tables
- **Toggles**: Collapsible sections as details/summary
- **Callouts**: Blockquotes with emoji indicators
- **Embeds**: Links with descriptions

### Batch Processing Strategy

For syncing entire Notion workspace:
1. Fetch workspace structure (databases and top-level pages)
2. Process databases first (schema definitions)
3. Process database entries
4. Process standalone pages recursively
5. Handle rate limiting between API calls
6. Track sync status and handle failures gracefully

## Slack Sync

### Data Structure

#### Content Format (Human-Readable)
The content stored in OpenMemory should be formatted for easy human reading:

```
Slack Message in #channel-name
Author: @username (Real Name)
Thread: [Parent message if reply]
Timestamp: 2025-01-20 10:30:45
Reactions: 👍 (3), 🎉 (1)

## Message
[Full message content preserved here]

## Thread Context (if reply)
Parent: [First 100 chars of parent message...]
Replies: 5 total messages in thread
```

For Slack channels:
```
Slack Channel: #channel-name
Type: public/private
Created: 2024-01-15
Creator: @username
Purpose: [Channel purpose]
Topic: [Current channel topic]
Members: 25

## Description
[Full channel description]

## Recent Activity
Last message: 2025-01-20 10:30:45
Messages today: 42
Active members: 12
```

#### Metadata Structure
The metadata enables filtering, searching, and programmatic access:

For messages:
```json
{
  "slack_message_id": "1234567890.123456",
  "slack_workspace": "codelab",
  "channel_id": "C1234567890",
  "channel_name": "general",
  "type": "message",
  "subtype": "channel_message",
  "source": "slack",
  "author_id": "U0J401GAH",
  "author_username": "webber",
  "author_real_name": "Webber Wang",
  "timestamp": "1234567890.123456",
  "thread_ts": "1234567890.123456",
  "reply_count": 0,
  "reactions": [
    {"name": "thumbsup", "count": 3},
    {"name": "tada", "count": 1}
  ],
  "mentions": ["U1234567890", "U0987654321"],
  "is_edited": false,
  "permalink": "https://codelab.slack.com/archives/C1234567890/p1234567890123456"
}
```

For channels:
```json
{
  "slack_channel_id": "C1234567890",
  "slack_workspace": "codelab",
  "channel_name": "general",
  "type": "channel",
  "source": "slack",
  "is_private": false,
  "is_archived": false,
  "is_general": true,
  "creator_id": "U0J401GAH",
  "created": "2024-01-15T10:30:00Z",
  "topic": "General discussion",
  "purpose": "Company-wide announcements and work-based matters",
  "member_count": 25,
  "last_activity": "2025-01-20T10:30:45Z"
}
```

### Key Design Principles

1. **Message Context**: Include channel and thread context for every message
2. **User Attribution**: Store both username and real name for clarity
3. **Thread Awareness**: Track parent messages and reply counts
4. **Reaction Tracking**: Preserve emoji reactions as social signals
5. **Channel Metadata**: Capture purpose, topic, and activity metrics
6. **Timestamp Precision**: Use Slack's timestamp format for exact ordering

### Content Type Variations

#### Channel Messages
- Regular messages posted to channels
- Include full message text
- Track reactions and mentions

#### Thread Replies
- Messages that are replies to other messages
- Include parent message context
- Track position in thread

#### Direct Messages
- Private conversations between users
- Similar structure but different privacy context
- No channel information

#### Channel Information
- Channel metadata and configuration
- Member lists and activity summaries
- Purpose and topic descriptions

### Special Slack Features

Handle Slack-specific formatting:
- **Mentions**: Convert `<@U123>` to readable usernames
- **Channel Links**: Convert `<#C123|channel>` to #channel
- **URLs**: Preserve `<http://example.com|text>` format
- **Emoji**: Keep custom emoji references `:custom_emoji:`
- **Code Blocks**: Preserve ` ``` ` formatting
- **Attachments**: Reference file attachments with metadata

### Batch Processing Strategy

For syncing Slack content:
1. Fetch all accessible channels
2. For each channel, fetch recent message history
3. Process threads separately to maintain context
4. Handle rate limiting (Slack tier limits)
5. Track last sync timestamp per channel
6. Incrementally sync new messages

### Privacy Considerations

- Only sync channels the bot/user has access to
- Respect private channel boundaries
- Exclude deleted messages
- Honor workspace data retention policies
- Anonymize sensitive information if needed

## Common Benefits

This unified structure provides:
- Easy human readability in the content
- Machine-parseable metadata for filtering/searching
- All necessary fields to reconstruct or update the source
- Clear distinction between different content types
- Consistent patterns across different data sources
- Integration with Claude Code through MCP

## Search Strategy

When retrieving from OpenMemory:
- Use consistent prefixes to identify source (e.g., "GitHub Issue #", "Notion Page:", "Slack Message in")
- Filter by source field in metadata
- Search within content for keywords
- Filter by type, state, or other metadata fields
- Combine multiple filters for precise results
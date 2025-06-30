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

### GitHub Issues Sync Task List

Starting sync of GitHub issues to OpenMemory (newest first, excluding pull requests):

- [x] Issue #3744: Sync GitHub issues and discussions to OpenMemory with metadata (closed)
- [x] Issue #3743: Feature Documentation: GitHub Issues to OpenMemory Sync - Building a Managed Memory Bank (open)
- [x] Issue #3742: Display a tag with description next to system pages (open)
- [x] Issue #3741: Nx Jest plugin runs jest directly, preventing @nx/jest options (open)
- [x] Issue #3737: Add branch name validation and Jest tests for workspace root (closed)
- [x] Issue #3736: Implement DEBUG environment variable pattern for service tracking (closed)
- [x] Issue #3735: Optimize GraphQL queries in import/export operations to reduce N+1 query patterns (open)
- [x] Issue #3734: Fix memory leak: registerRootStore called without cleanup on navigation (open)
- [x] Issue #3732: Remove custom GraphQL resolvers causing N+1 query problems (closed)
- [x] Issue #3731: Refactor: Simplify Page-Element relationship by removing redundant rootElement (open)
- [x] Issue #3730: RFC: Page-Element Relationship Architecture - Tree Traversal vs Direct Relationships (open)
- [x] Issue #3729: Performance: N+1 query issue in page builder causing 1000ms+ overhead (closed)
- [x] Issue #3728: feat: Implement service tracking for frontend GraphQL server calls (closed)
- [x] Issue #3725: Graphql endpoint throws "socket hang up" on large apps (open)
- [x] Issue #3724: Add new elements in builder as last child (closed)
- [x] Issue #3723: Demo web application (open)
- [x] Issue #3720: Serving web app locally has a memory leak (open)
- [x] Issue #3719: Nx Next.js keeps hitting heap memory limit (closed)
- [x] Issue #3713: ReactNodeType props cause builder to hang and crash (closed)
- [x] Issue #3712: Migrate to uniforms 4 (open)
- [x] Issue #3709: Field default values problems (open)
- [x] Issue #3708: Infinit loop in interface fields (closed)
- [x] Issue #3706: UpdateComponentForm not working (closed)
- [x] Issue #3704: UpdateField form validation failure (closed)
- [x] Issue #3702: Element is added to the wrong page after switching pages in builder (closed)
- [x] Issue #3700: Can't use expressions for array type fields (closed)
- [x] Issue #3696: Changing renderType to component causing builder failure (closed)
- [x] Issue #3694: Infinite reload of Props form when "children" value exists (closed)
- [x] Issue #3691: Inconsistent atoms, components and apps export (closed)
- [x] Issue #3690: Import admin data does not work (closed)
- [x] Issue #3688: Builder general fixes (closed)
- [x] Issue #3684: Admin importing data throws error before finishing (closed)
- [x] Issue #3681: Create a template system for platform (closed)
- [ ] Issue #3666: Script error on opening /tags page (closed)
- [ ] Issue #3665: Searching stopped working on /atoms, /types pages (closed)
- [ ] Issue #3655: Add Active Confing Pane Tab to preferences (closed)
- [ ] Issue #3650: Default values applied regardless of nullability (open)
- [ ] Issue #3649: Breadcrumb page list (closed)
- [ ] Issue #3646: Activate incremental build with project references (open)
- [ ] Issue #3643: Allow to specify order of fields inside interfaces (closed)
- [ ] Issue #3640: Some of the navigations between pages do not work (closed)
- [ ] Issue #3635: Can't create recursive types structures (closed)
- [ ] Issue #3631: Prefetch doesn't work (open)
- [ ] Issue #3626: Blueprint component does not work (closed)
- [ ] Issue #3625: UI issues on CSS builder tab (open)
- [ ] Issue #3624: Migrate delete dialogs to Popconfirm (open)
- [ ] Issue #3613: Add user menu to the application header (closed)
- [ ] Issue #3606: Field type changes are not persistent (open)
- [ ] Issue #3605: Server resets connection on attempt to open app that has many elements (closed)
- [ ] Issue #3599: NX Cloud issue (closed)
- [ ] Issue #3598: Fix Remaining e2e specs (closed)
- [ ] Issue #3600: Playwright hangs and nothing shows (closed)
- [ ] Issue #3589: Fix types e2e specs (closed)
- [ ] Issue #3588: Fixing e2e specs (closed)
- [ ] Issue #3586: Fix apps e2e specs (closed)
- [ ] Issue #3579: Page reloads in the middle of builder e2e (closed)
- [ ] Issue #3578: Neo4j incorrect translated predicate (closed)
- [ ] Issue #3577: Minor bugs in the application UI (open)
- [ ] Issue #3576: Add restrictions for some atoms to be children only of specific parent atoms (closed)
- [ ] Issue #3575: Many atoms do not have correct API and can't be configured in builder (open)
- [ ] Issue #3574: Some antd atoms crash the builder (closed)
- [ ] Issue #3569: Refactor: codegen plugins (closed)
- [ ] Issue #3558: Remove legacy decorator, use TS5 decorator (closed)
- [ ] Issue #3557: Storybook vite vs next.js issue (closed)
- [ ] Issue #3552: Uniform select field label showing id and not label (closed)
- [ ] Issue #3545: Create element for bug (closed)
- [ ] Issue #3540: Parallel route router push doesn't close modal (closed)
- [ ] Issue #3539: Tailwindcss Nextjs hot reload (open)
- [ ] Issue #3535: Circleci migrate to arm (closed)
- [ ] Issue #3533: Neo4j error on attempt to attach pre-/post- render actions (closed)
- [ ] Issue #3526: Fixing broken e2e specs (closed)
- [ ] Issue #3492: nextjs-auth0 is attempting to set cookies from a server component (closed)
- [ ] Issue #3489: React resize panel can't set min pixels (closed)
- [ ] Issue #3488: Migrate Cypress specs over to playwright (closed)
- [ ] Issue #3487: Refactor admin use cases (closed)
- [ ] Issue #3485: Nested routes not working (closed)
- [ ] Issue #3496: Finish migration for Users table page (closed)
- [ ] Issue #3495: Debug extra rendering with sentry (closed)
- [ ] Issue #3504: Nextjs parallel routes router.push doesn't trigger default (closed)
- [ ] Issue #3482: Migrate CuiTree pagination to standard AntDesign Pagination component (closed)
- [ ] Issue #3479: Can't create element on the page builder (closed)
- [ ] Issue #3475: Nest can't resolve dependencies of the (closed)
- [ ] Issue #3474: Pnpm prune error (closed)
- [ ] Issue #3473: Open element props panel error (closed)
- [ ] Issue #3471: Error when accessing apps route for the first time (closed)
- [ ] Issue #3470: Failed to import app (closed)
- [ ] Issue #3469: Store expanded nodes in ElemnetTree (closed)
- [ ] Issue #3463: Cannot update a component (X) while rendering a different component (Y) (closed)
- [ ] Issue #3459: Activate incremental mode for Next.js nx (closed)
- [ ] Issue #3457: Migrate Component playwright (closed)
- [ ] Issue #3454: Refactor builder service to mobx keystone (closed)
- [ ] Issue #3452: Ant Design FOUC app router (closed)
- [ ] Issue #3444: Jwt middleware throwing bug (closed)
- [ ] Issue #3441: Move user preferences to user model (closed)
- [ ] Issue #3397: Refactor app router (closed)
- [ ] Issue #3396: No visual indicator if graphql requests are failing (closed)
- [ ] Issue #3389: Render if field looses focus after each key press (closed)
- [ ] Issue #3387: AntDesignMessage component crashes builder (open)
- [ ] Issue #3386: AntDesignFormList crashes the builder (closed)
- [ ] Issue #3385: AntDesignDropdown/AntDesignDropdownButton atoms crash builder (open)
- [ ] Issue #3384: AntDesignCarousel atom crashes the builder (closed)
- [ ] Issue #3382: Ux improvement: convert right panel to collapsible/expandable sidebar (closed)
- [ ] Issue #3379: Can't set text content on some atoms (closed)
- [ ] Issue #3378: Can't delete element from element toolbar (closed)
- [ ] Issue #3377: Attempt to search for tag redirects to Types page (closed)
- [ ] Issue #3374: Remove barrel import (closed)
- [ ] Issue #3371: Component builder failed to load types (closed)
- [ ] Issue #3367: Build demo CRUD application (open)
- [ ] Issue #3362: Runtime refactor (closed)
- [ ] Issue #3360: Migrate NX to 19 (closed)
- [ ] Issue #3357: Allow to select width breakpoints for components (closed)
- [ ] Issue #3356: Refactor ChildMapperField (open)
- [ ] Issue #3353: Make floating toolbar for rich text editor (open)
- [ ] Issue #3341: Default values for union types (open)
- [ ] Issue #3340: Some kind of loop (closed)
- [ ] Issue #3339: Child mapper should only work for atom type (closed)
- [ ] Issue #3338: Replace allowRichTextInjection with children: RichTextEditor (closed)
- [ ] Issue #3335: Fix e2e specs (closed)
- [ ] Issue #3331: Persist TextEditor value change only in edit mode (closed)
- [ ] Issue #3329: Components builder not found due to merge errors (closed)
- [ ] Issue #3324: Move element doesn't work (closed)
- [ ] Issue #3323: Drag and drop using runtime keys (closed)
- [ ] Issue #3321: Write unit specs for antdTree (closed)
- [ ] Issue #3319: Can't duplicate element (closed)
- [ ] Issue #3312: Delete Component bug (closed)
- [ ] Issue #3311: Create Component should not be greyed out (closed)
- [ ] Issue #3310: Hangs when there is child element added to a component instance (open)
- [ ] Issue #3308: Can't open component props settings once an element is selected (closed)
- [ ] Issue #3307: Component export/import (closed)
- [ ] Issue #3300: Builder crashes when a resource is used inside the component builder (open)
- [ ] Issue #3299: Animations (open)
- [ ] Issue #3292: Make production apps available at autogenerated URL (open)
- [ ] Issue #3290: Builder crashes when a resource is used inside the component builder (closed)
- [ ] Issue #3281: Primitive type form update doesn't work (closed)
- [ ] Issue #3277: Provider state is not passed into Component state-sharing.cy.ts (closed)
- [ ] Issue #3276: Cypress editorjs error (closed)
- [ ] Issue #3275: Explorerer tree flickers (closed)
- [ ] Issue #3272: Bind component's children into children prop instead of using componentChildrenContainer (closed)
- [ ] Issue #3265: Component elements not showing correctly for selecting a container (closed)
- [ ] Issue #3264: Cannot create app (closed)
- [ ] Issue #3255: Cypress seeding refactor (closed)
- [ ] Issue #3254: ReactFragment JS expression breaks (closed)
- [ ] Issue #3252: Prop inspector updates do not re-render (closed)
- [ ] Issue #3249: Fix e2e tests (closed)
- [ ] Issue #3248: Chatbot custom component using openai API (closed)
- [ ] Issue #3247: Refactor UseCase interface to use CQRS (closed)
- [ ] Issue #3246: Seed system data in Cypress before all (closed)
- [ ] Issue #3244: Type ref not loaded when creating element (closed)
- [ ] Issue #3242: Unit specs for functionalities in e-commerce sample app (closed)
- [ ] Issue #3239: Split runtimeContainer to runtimePage and runtimeComponent (closed)
- [ ] Issue #3238: GraphQL endpoints are not guarded by auth0 (open)
- [ ] Issue #3234: actions, states access bugs (closed)
- [ ] Issue #3230: Fix frontend-application-renderer specs (closed)
- [ ] Issue #3227: in-app routing functionality 2 (closed)
- [ ] Issue #3226: Update renderer diagrams (closed)
- [ ] Issue #3224: Cache atoms (closed)
- [ ] Issue #3221: Styles for different states of an element (closed)
- [ ] Issue #3220: Cannot delete elements (closed)
- [ ] Issue #3217: Newly created state variables are not defined (closed)
- [ ] Issue #3213: State expressions are not evaluated (closed)
- [ ] Issue #3208: Exporting/Importing an app is not working (closed)
- [ ] Issue #3206: Micro UX improvement: unify render type lists (closed)
- [ ] Issue #3205: Get rid of proxy middleware in platform project (closed)
- [ ] Issue #3199: Cannot open any app if a component has more than one element (closed)
- [ ] Issue #3198: New element's api is not loaded (closed)
- [ ] Issue #3197: Style editor issues (closed)
- [ ] Issue #3195: Allow users to create/assing/delete app domains in DigitalOcean (closed)
- [ ] Issue #3194: Type loading strategy for Element (closed)
- [ ] Issue #3193: In-app reload (open)
- [ ] Issue #3191: Crashing when opening a component in the component builder (closed)
- [ ] Issue #3187: Migrate infrastructure from Vercel to Digital Ocean (closed)
- [ ] Issue #3184: Try to make e-commerce app (closed)
- [ ] Issue #3183: Persisting previously selected viewport (closed)
- [ ] Issue #3175: cannot drag and drop components in builder (closed)
- [ ] Issue #3174: fix: app does not open when element of type component is used (closed)
- [ ] Issue #3173: App fails to open if element render type is a component. (closed)
- [ ] Issue #3171: Fix CircleCI builds (e2e job) (closed)
- [ ] Issue #3165: Element atom props disappears when opening the atoms dropdown for creating a new element (closed)
- [ ] Issue #3162: test dnd (closed)
- [ ] Issue #3161: Cleanup unused descendantElements field resolver (closed)
- [ ] Issue #3159: Services not initialized (closed)
- [ ] Issue #3157: New element is not rendered (closed)
- [ ] Issue #3155: Store is not initialized (closed)
- [ ] Issue #3153: Builder layout issues (closed)
- [ ] Issue #3151: Cannot create a component (closed)
- [ ] Issue #3143: Vercel serverside timeout (closed)
- [ ] Issue #3142: Abstract popver even more (closed)
- [ ] Issue #3140: Move router state to mobx (closed)
- [ ] Issue #3139: Custom resolver to replace loadAllTypesForElements (closed)
- [ ] Issue #3133: Create type form in Storybook (closed)
- [ ] Issue #3130: Global css not working for storybook (closed)
- [ ] Issue #3129: Writing specs for renderer (closed)
- [ ] Issue #3127: Redesign mapper (closed)
- [ ] Issue #3122: Drag & drop functionality (closed)
- [ ] Issue #3121: Integration specs for import/export (closed)
- [ ] Issue #3105: Element/Component runtime refactor (closed)
- [ ] Issue #3104: Support ReactNode type for components (closed)
- [ ] Issue #3103: Cover more cases in type transformer specs (closed)
- [ ] Issue #3100: Tailwind warning logs (closed)
- [ ] Issue #3092: Text styling is not persisted to database (closed)
- [ ] Issue #3091: Text editor is obscured by the element's highlight (closed)
- [ ] Issue #3089: Add more unit tests for the renderer lib (closed)
- [ ] Issue #3086: Atom id is shown instead of name in dropdown (closed)
- [ ] Issue #3079: changing element render type to component is not persisted (closed)
- [ ] Issue #3078: Types are not loaded (closed)
- [ ] Issue #3073: Add auth guards to pages (closed)
- [ ] Issue #3071: Websites still call graphql api via platfrom proxy (closed)
- [ ] Issue #3070: componentProps are not available in preview mode (closed)
- [ ] Issue #3069: Elements disappear (closed)
- [ ] Issue #3068: Error when selecting a tailwind class (closed)
- [ ] Issue #3063: Fix websites projects (closed)
- [ ] Issue #3060: Deploy to production with data (closed)
- [ ] Issue #3056: Fix import/export specs (closed)
- [ ] Issue #3050: Renderer refactor and fix (closed)
- [ ] Issue #3049: Refactor dropPosition to use Ref<IElementModel> (closed)
- [ ] Issue #3043: Determine the best approach for integrating Tailwind CSS into the builder (closed)
- [ ] Issue #3040: Refactor websites to call platform-api directly (closed)
- [ ] Issue #3039: Add page resolver for elements (closed)
- [ ] Issue #3037: Odd issue of Cypress auth0 401 relating to nx version (closed)
- [ ] Issue #3030: Extract style to own class (closed)
- [ ] Issue #3029: Refactor CUI Cypress commands (closed)
- [ ] Issue #3028: Refactor uniform field components (closed)
- [ ] Issue #3025: Restore getServerSideProps to guard pages (closed)
- [ ] Issue #3024: Cannot have non-nullable union type (closed)
- [ ] Issue #3018: Production, Preview, and dev mismatch (closed)
- [ ] Issue #3016: Element selection issues (closed)
- [ ] Issue #3015: Allow to switch between mobile-first and desktop-first (closed)
- [ ] Issue #3011: Simplify route change hooks in the preview mode (closed)
- [ ] Issue #3010: State variables are not replaced with values in production (closed)
- [ ] Issue #3008: pre-render hook's action can crash the builder (open)
- [ ] Issue #3005: Refactor renderer's conditional render logic (closed)
- [ ] Issue #3003: imposible to set field default value to false (closed)
- [ ] Issue #3001: Element is not re-rendered on state update (closed)
- [ ] Issue #2998: Google Fonts doesn't work (closed)
- [ ] Issue #2995: Script error on attempt to duplicate element (closed)
- [ ] Issue #2993: Selected element label overlaps element content (closed)
- [ ] Issue #2991: Some CSS styles are not applied (closed)
- [ ] Issue #2990: Enhance CSS editor (closed)
- [ ] Issue #2986: Fix e2e tests (closed)
- [ ] Issue #2985: Impossible to set inner text on Link atom (closed)
- [ ] Issue #2983: CI issue (closed)
- [ ] Issue #2982: Intergrate a default CMS (closed)
- [ ] Issue #2981: Create Stripe Subscription Starter (closed)
- [ ] Issue #2979: State variables are not replaced (closed)
- [ ] Issue #2976: Edit fields of state shows on types table page (closed)
- [ ] Issue #2975: Converted element to component shouldn't be wrapped by another root element (closed)
- [ ] Issue #2973: CI fails due to lint errors (closed)
- [ ] Issue #2972: Child mapper component names are not unique (closed)
- [ ] Issue #2970: Custom components preview (closed)
- [ ] Issue #2964: Unique name constraint is not applied on page (closed)
- [ ] Issue #2961: Actions cannot run inside a code action (closed)
- [ ] Issue #2960: Conditionally trigger the API action in pre-render (closed)
- [ ] Issue #2957: Routing with shopify product id does not work (closed)
- [ ] Issue #2956: `theme` prop of the AntDesignMenu is not working (closed)
- [ ] Issue #2955: Make Elements in the Builder View Draggable and Droppable (closed)
- [ ] Issue #2954: Make element name unique inside page or component tree (closed)
- [ ] Issue #2953: Exclude parent actions in success and error actions select box (closed)
- [ ] Issue #2951: Build issue on master branch (closed)
- [ ] Issue #2949: Restrict refs usage for elements with atoms only (closed)
- [ ] Issue #2948: Decouple services from model interface (closed)
- [ ] Issue #2946: Some CSS Properties are not Applied as Expected (closed)
- [ ] Issue #2944: "Build Page" menu button does not work (closed)
- [ ] Issue #2943: Text editor inside builder with inline toolbar (closed)
- [ ] Issue #2942: Introduce CSS breakpoints in builder (closed)
- [ ] Issue #2939: Remove propsTransformationJs (closed)
- [ ] Issue #2937: "Add" element context menu option does not work (closed)
- [ ] Issue #2935: Child mapper props passing is broken (closed)
- [ ] Issue #2934: Renderer diagrams (closed)
- [ ] Issue #2933: Show Assigned ReactNode Props in Element Tree View (closed)
- [ ] Issue #2930: Experiment with Custom Static Site Rendering Without Shipping Next.js and React to the Client (closed)
- [ ] Issue #2928: Builds fail on master (closed)
- [ ] Issue #2926: Replicating an e-commerce with shopify APIs (closed)
- [ ] Issue #2924: Think of approach to provide better UX for creating mobile/tablet layouts (closed)
- [ ] Issue #2923: Unify UI for empty accordion content (closed)
- [ ] Issue #2918: Actions from rootStore are not executed as pre-/post-render hook (closed)
- [ ] Issue #2916: childMapperComponent not imported on app import (closed)
- [ ] Issue #2914: Pages are not sorted properly (closed)
- [ ] Issue #2913: Inline forms do not show validation error text (closed)
- [ ] Issue #2911: Script error on disabled sidebar button click (closed)
- [ ] Issue #2910: Persist _app page state between navigation using NextLink atom (closed)
- [ ] Issue #2902: Try to replicate the "checkout" logic on an e-commerce site (closed)
- [ ] Issue #2900: Layout renders incorrectly for a short time (closed)
- [ ] Issue #2897: The child mapper data is not imported when importing user data (closed)
- [ ] Issue #2896: Converting element to componet should create actions in component store (closed)
- [ ] Issue #2895: Revisit autocomplete for form inputs (closed)
- [ ] Issue #2894: Devices toolbar issues (closed)
- [ ] Issue #2893: Error setting renderType of body (closed)

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
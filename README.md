# n8n Workflow Repository Sync

Choose between local development and n8n instance management.

This repository provides tools to sync workflows between your local environment and n8n instance.

## 🚀 Quick Start

### Method 1: Node.js Sync Tool (Recommended)

```bash
# Install dependencies
npm install

# Set environment variables
$env:N8N_API_URL = "https://agent.nexpath.eu"
$env:N8N_API_KEY = "your-api-key"

# Use the tool
npm run list                    # List all workflows
node sync.js pull --name "Random Emoji Generator"
node sync.js backup            # Backup all workflows
```

### Method 2: MCP Tools (VS Code Integration)

The MCP tools are already working in your VS Code environment and provide the most reliable access.

```javascript
mcp_n8n-local_n8n_list_workflows()
mcp_n8n-local_n8n_get_workflow({id: "2Gt5MdHYV4t1chzg"})
mcp_n8n-local_n8n_create_workflow(workflowData)
```

## 📋 Available Commands

### Node.js Tool

```bash
node sync.js list                           # List all workflows
node sync.js pull --id "workflow-id"       # Pull by ID
node sync.js pull --name "workflow-name"   # Pull by name
node sync.js backup                         # Backup all workflows
```

### NPM Scripts

```bash
npm run list      # List all workflows
npm run pull      # Pull specific workflow
npm run backup    # Backup all workflows
```

## 🏗️ Workflow Development Options

### Option 1: Local Development

1. Create/edit workflows in `workflows/` directory as JSON files
2. Use the repository for version control
3. Deploy to n8n when ready
4. **Best for**: Complex workflows, team collaboration, version control

### Option 2: n8n Instance Development

1. Build workflows directly in n8n UI
2. Pull completed workflows to local repo for backup
3. Use n8n's visual editor and testing features
4. **Best for**: Rapid prototyping, visual development, immediate testing

### Option 3: Hybrid Approach (Recommended)

1. Prototype and test in n8n UI
2. Pull stable workflows to local repo
3. Make detailed edits locally if needed  
4. Keep both in sync for backup and collaboration

## 📁 Directory Structure

```text
workflows/
├── backup_2025-08-31T14-30-22/    # Timestamped backups
├── Random_Emoji_Generator.json     # Individual workflows  
└── ...

sync.js                             # Node.js sync tool
package.json                       # Node.js dependencies
README.md                          # This file
```

## 🔧 Setup Requirements

### Environment Variables

```bash
N8N_API_URL=https://agent.nexpath.eu
N8N_API_KEY=your-api-key-here
```

### Node.js Dependencies

```bash
npm install axios commander
```

## 📊 Current Status

✅ **Working**: MCP tools integration  
✅ **Working**: Node.js sync tool
✅ **Working**: Local workflow storage
🔄 **In Progress**: Bi-directional sync (local → n8n)

## 🔄 Sync Workflow

### From n8n to Local

```bash
# List available workflows
npm run list

# Pull specific workflow  
node sync.js pull --name "Random Emoji Generator"

# Backup everything
npm run backup
```

### From Local to n8n

Currently use MCP tools in VS Code:

```javascript
// Create new workflow
mcp_n8n-local_n8n_create_workflow(workflowData)

// Update existing
mcp_n8n-local_n8n_update_partial_workflow({id, operations})
```

## 🎯 Best Practices

1. **Regular Backups**: Use `npm run backup` regularly
2. **Version Control**: Commit important workflows to Git
3. **Naming Convention**: Use descriptive workflow names
4. **Testing**: Test workflows in n8n before production
5. **Documentation**: Document complex workflows in comments

## 📝 Workflow File Format

Each workflow is saved as JSON with metadata:

```json
{
  "id": "2Gt5MdHYV4t1chzg",
  "name": "Random Emoji Generator",
  "active": false,
  "createdAt": "2025-08-31T11:13:41.390Z",
  "updatedAt": "2025-08-31T11:14:05.352Z",
  "tags": [],
  "nodes": [...],
  "connections": {...},
  "settings": {...}
}
```

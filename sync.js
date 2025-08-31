#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    apiUrl: process.env.N8N_API_URL || 'https://agent.nexpath.eu',
    apiKey: process.env.N8N_API_KEY || '',
    workflowsDir: './workflows'
};

// Ensure workflows directory exists
async function ensureWorkflowsDir() {
    try {
        await fs.access(CONFIG.workflowsDir);
    } catch {
        await fs.mkdir(CONFIG.workflowsDir, { recursive: true });
        console.log('✅ Created workflows directory');
    }
}

// Create clean filename from workflow name
function sanitizeFilename(name) {
    return name.replace(/[\\/:*?"<>|]/g, '_') + '.json';
}

// API helper
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method,
            url: `${CONFIG.apiUrl}/api/v1${endpoint}`,
            headers: {
                'Authorization': `Bearer ${CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            }
        };
        
        if (data) config.data = data;
        
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`❌ API Error: ${error.message}`);
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data:`, error.response.data);
        }
        return null;
    }
}

// List all workflows
async function listWorkflows() {
    console.log('📋 Fetching workflows from n8n...\n');
    
    const response = await apiRequest('/workflows');
    if (!response) return;
    
    const workflows = response.data?.workflows || response.workflows || [];
    
    console.log('📋 Available Workflows:');
    console.log('='.repeat(80));
    
    workflows.forEach(workflow => {
        const status = workflow.active ? '🟢 Active' : '🔴 Inactive';
        const tags = workflow.tags?.length > 0 ? 
            `🏷️  ${workflow.tags.map(t => t.name || t).join(', ')}` : '';
        
        console.log(`ID: ${workflow.id}`);
        console.log(`Name: ${workflow.name}`);
        console.log(`Status: ${status}${tags ? ` | ${tags}` : ''}`);
        console.log(`Nodes: ${workflow.nodeCount || 'N/A'} | Updated: ${workflow.updatedAt}`);
        console.log('-'.repeat(80));
    });
    
    return workflows;
}

// Pull specific workflow
async function pullWorkflow(workflowId, workflowName) {
    await ensureWorkflowsDir();
    
    let targetId = workflowId;
    
    // If name provided, find ID
    if (workflowName && !workflowId) {
        console.log(`🔍 Finding workflow: ${workflowName}`);
        const response = await apiRequest('/workflows');
        if (!response) return;
        
        const workflows = response.data?.workflows || response.workflows || [];
        const found = workflows.find(w => w.name === workflowName);
        
        if (!found) {
            console.error(`❌ Workflow "${workflowName}" not found`);
            return;
        }
        
        targetId = found.id;
    }
    
    if (!targetId) {
        console.error('❌ Please provide either --id or --name');
        return;
    }
    
    console.log(`⬇️ Pulling workflow: ${targetId}`);
    
    const workflow = await apiRequest(`/workflows/${targetId}`);
    if (!workflow) return;
    
    const workflowData = workflow.data || workflow;
    
    // Save to file
    const filename = sanitizeFilename(workflowData.name);
    const filepath = path.join(CONFIG.workflowsDir, filename);
    
    // Clean up the data
    const cleanWorkflow = {
        id: workflowData.id,
        name: workflowData.name,
        active: workflowData.active,
        createdAt: workflowData.createdAt,
        updatedAt: workflowData.updatedAt,
        tags: workflowData.tags || [],
        nodes: workflowData.nodes || [],
        connections: workflowData.connections || {},
        settings: workflowData.settings || {},
        staticData: workflowData.staticData || null,
        meta: {
            instanceId: workflowData.versionId,
            pulledAt: new Date().toISOString()
        },
        pinData: workflowData.pinData || null
    };
    
    await fs.writeFile(filepath, JSON.stringify(cleanWorkflow, null, 2));
    console.log(`✅ Saved: ${filename}`);
}

// Backup all workflows
async function backupWorkflows() {
    await ensureWorkflowsDir();
    
    console.log('💾 Starting backup of all workflows...');
    
    const response = await apiRequest('/workflows');
    if (!response) return;
    
    const workflows = response.data?.workflows || response.workflows || [];
    
    // Create backup directory with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const backupDir = path.join(CONFIG.workflowsDir, `backup_${timestamp}`);
    await fs.mkdir(backupDir, { recursive: true });
    
    console.log(`📁 Backup directory: ${backupDir}`);
    
    let successCount = 0;
    
    for (const workflow of workflows) {
        try {
            console.log(`⬇️ Downloading: ${workflow.name}...`);
            
            const fullWorkflow = await apiRequest(`/workflows/${workflow.id}`);
            if (!fullWorkflow) continue;
            
            const workflowData = fullWorkflow.data || fullWorkflow;
            const filename = sanitizeFilename(workflowData.name);
            const filepath = path.join(backupDir, filename);
            
            const cleanWorkflow = {
                id: workflowData.id,
                name: workflowData.name,
                active: workflowData.active,
                createdAt: workflowData.createdAt,
                updatedAt: workflowData.updatedAt,
                tags: workflowData.tags || [],
                nodes: workflowData.nodes || [],
                connections: workflowData.connections || {},
                settings: workflowData.settings || {},
                staticData: workflowData.staticData || null,
                meta: {
                    instanceId: workflowData.versionId,
                    backedUpAt: new Date().toISOString()
                },
                pinData: workflowData.pinData || null
            };
            
            await fs.writeFile(filepath, JSON.stringify(cleanWorkflow, null, 2));
            console.log(`✅ Saved: ${filename}`);
            successCount++;
            
        } catch (error) {
            console.error(`❌ Failed to backup ${workflow.name}: ${error.message}`);
        }
    }
    
    console.log(`\n🎉 Backup completed: ${successCount}/${workflows.length} workflows saved`);
    console.log(`📁 Location: ${backupDir}`);
}

// CLI setup
program
    .name('n8n-sync')
    .description('Sync workflows between n8n instance and local repository')
    .version('1.0.0');

program
    .command('list')
    .description('List all workflows in n8n instance')
    .action(listWorkflows);

program
    .command('pull')
    .description('Pull specific workflow to local repository')
    .option('-i, --id <id>', 'Workflow ID')
    .option('-n, --name <name>', 'Workflow name')
    .action((options) => pullWorkflow(options.id, options.name));

program
    .command('backup')
    .description('Backup all workflows to timestamped directory')
    .action(backupWorkflows);

// Default action
if (process.argv.length === 2) {
    console.log('🚀 n8n Workflow Sync Tool\n');
    console.log('Available commands:');
    console.log('  npm run list      - List all workflows');
    console.log('  npm run pull      - Pull specific workflow');
    console.log('  npm run backup    - Backup all workflows');
    console.log('\nExamples:');
    console.log('  node sync.js list');
    console.log('  node sync.js pull --name "Random Emoji Generator"');
    console.log('  node sync.js pull --id "2Gt5MdHYV4t1chzg"');
    console.log('  node sync.js backup');
    console.log('\nMake sure to set N8N_API_URL and N8N_API_KEY environment variables.');
    process.exit(0);
}

program.parse();

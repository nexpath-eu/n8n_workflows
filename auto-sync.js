const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class N8nWorkflowSyncer {
    constructor() {
        this.apiUrl = process.env.N8N_API_URL || 'http://localhost:5678';
        this.apiKey = process.env.N8N_API_KEY;
        this.workflowsDir = path.join(__dirname, 'workflows');
        this.logFile = path.join(__dirname, 'sync.log');
        this.metadataFile = path.join(__dirname, 'workflow-metadata.json');
    }

    async init() {
        if (!this.apiKey) {
            throw new Error('N8N_API_KEY environment variable is required');
        }

        // Ensure workflows directory exists
        try {
            await fs.access(this.workflowsDir);
        } catch {
            await fs.mkdir(this.workflowsDir, { recursive: true });
        }
    }

    async log(message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        console.log(message);
        await fs.appendFile(this.logFile, logEntry);
    }

    sanitizeFilename(name) {
        return name
            .replace(/[^a-z0-9\s-]/gi, '')
            .replace(/\s+/g, '_')
            .replace(/-+/g, '_')
            .replace(/_+/g, '_')
            .trim();
    }

    async makeRequest(endpoint, method = 'GET', data = null) {
        try {
            const config = {
                method,
                url: `${this.apiUrl}/api/v1${endpoint}`,
                headers: {
                    'X-N8N-API-KEY': this.apiKey,
                    'Content-Type': 'application/json'
                }
            };

            if (data) {
                config.data = data;
            }

            const response = await axios(config);
            return response.data;
        } catch (error) {
            await this.log(`API Error: ${error.message}`);
            if (error.response) {
                await this.log(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
            }
            throw error;
        }
    }

    async getWorkflows() {
        await this.log('Fetching workflow list...');
        const response = await this.makeRequest('/workflows');
        await this.log(`Found ${response.data.length} workflows`);
        return response.data;
    }

    async getWorkflowDetails(workflowId) {
        await this.log(`Fetching details for workflow: ${workflowId}`);
        const response = await this.makeRequest(`/workflows/${workflowId}`);
        return response.data;
    }

    async saveWorkflow(workflow) {
        const sanitizedName = this.sanitizeFilename(workflow.name);
        const filename = `${sanitizedName}.json`;
        const filepath = path.join(this.workflowsDir, filename);

        // Clean up the workflow data for storage
        const cleanWorkflow = {
            id: workflow.id,
            name: workflow.name,
            active: workflow.active,
            createdAt: workflow.createdAt,
            updatedAt: workflow.updatedAt,
            tags: workflow.tags || [],
            nodes: workflow.nodes || [],
            connections: workflow.connections || {},
            settings: workflow.settings || {},
            staticData: workflow.staticData,
            pinData: workflow.pinData || {}
        };

        await fs.writeFile(filepath, JSON.stringify(cleanWorkflow, null, 2));
        await this.log(`Saved: ${filename}`);
        
        return {
            id: workflow.id,
            name: workflow.name,
            filename,
            filepath: filepath.replace(__dirname, '.'),
            active: workflow.active,
            nodeCount: workflow.nodes?.length || 0,
            tags: workflow.tags?.map(t => t.name) || [],
            lastUpdated: workflow.updatedAt,
            synced: new Date().toISOString()
        };
    }

    async syncAll() {
        try {
            await this.init();
            await this.log('Starting full workflow sync...');
            
            const workflows = await this.getWorkflows();
            const metadata = [];
            let successCount = 0;
            let errorCount = 0;

            for (const workflow of workflows) {
                try {
                    await this.log(`\n--- Syncing: ${workflow.name} (${workflow.id}) ---`);
                    
                    const fullWorkflow = await this.getWorkflowDetails(workflow.id);
                    const meta = await this.saveWorkflow(fullWorkflow);
                    metadata.push(meta);
                    successCount++;
                    
                    // Small delay to be nice to the API
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                } catch (error) {
                    await this.log(`Error syncing ${workflow.name}: ${error.message}`);
                    errorCount++;
                }
            }

            // Save metadata
            await fs.writeFile(this.metadataFile, JSON.stringify(metadata, null, 2));
            
            await this.log(`\n=== Sync Complete ===`);
            await this.log(`✅ Successfully synced: ${successCount} workflows`);
            await this.log(`❌ Errors: ${errorCount} workflows`);
            await this.log(`📁 Workflows saved to: ${this.workflowsDir}`);
            await this.log(`📊 Metadata saved to: ${this.metadataFile}`);

            return {
                success: successCount,
                errors: errorCount,
                total: workflows.length,
                metadata
            };

        } catch (error) {
            await this.log(`Fatal error during sync: ${error.message}`);
            throw error;
        }
    }

    async listLocal() {
        try {
            const metadataPath = this.metadataFile;
            const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'));
            
            console.log('\n📁 Local Workflow Repository:');
            console.log('================================\n');
            
            metadata.forEach((workflow, index) => {
                console.log(`${index + 1}. ${workflow.name}`);
                console.log(`   📄 File: ${workflow.filename}`);
                console.log(`   🔗 ID: ${workflow.id}`);
                console.log(`   📊 Nodes: ${workflow.nodeCount}`);
                console.log(`   🏷️  Tags: ${workflow.tags.join(', ') || 'None'}`);
                console.log(`   ⚡ Active: ${workflow.active ? 'Yes' : 'No'}`);
                console.log(`   🕒 Updated: ${new Date(workflow.lastUpdated).toLocaleDateString()}`);
                console.log('');
            });
            
            return metadata;
        } catch (error) {
            console.log('No local metadata found. Run sync first.');
            return [];
        }
    }
}

// CLI functionality
if (require.main === module) {
    const command = process.argv[2];
    const syncer = new N8nWorkflowSyncer();

    switch (command) {
        case 'sync':
            syncer.syncAll()
                .then(result => {
                    console.log('\n🎉 Sync completed successfully!');
                    console.log(`Total: ${result.total}, Success: ${result.success}, Errors: ${result.errors}`);
                })
                .catch(error => {
                    console.error('❌ Sync failed:', error.message);
                    process.exit(1);
                });
            break;
            
        case 'list':
            syncer.listLocal()
                .then(metadata => {
                    if (metadata.length === 0) {
                        console.log('No workflows found locally. Run "node auto-sync.js sync" first.');
                    }
                })
                .catch(error => {
                    console.error('❌ List failed:', error.message);
                    process.exit(1);
                });
            break;
            
        default:
            console.log(`
🔄 N8n Workflow Syncer
=====================

Usage:
  node auto-sync.js sync   - Sync all workflows from n8n to local repository
  node auto-sync.js list   - List all local workflows

Environment Variables:
  N8N_API_URL             - n8n instance URL (default: http://localhost:5678)
  N8N_API_KEY             - n8n API key (required)

Examples:
  N8N_API_KEY=your_key node auto-sync.js sync
  node auto-sync.js list
            `);
    }
}

module.exports = N8nWorkflowSyncer;

# Google Sheets Update Fix - Complete BrandBookMaker Workflow

## Problem
The "Save Product Benefits to Excel" and "Save Brand Benefits to Excel" nodes were creating new rows instead of updating the existing row in the Google Sheets form responses.

## Root Cause
The nodes were configured to use the `append` operation to separate sheets ("ProductBenefits" and "BrandBenefits") instead of using `appendOrUpdate` operation to update the original form response row in the "Form Responses 1" sheet.

## Solution Applied

### 1. Updated "Save Product Benefits to Excel" Node
- **Changed operation**: From `append` to `appendOrUpdate`
- **Changed target sheet**: From "ProductBenefits" to "Form Responses 1" (gid: 2138296752)
- **Added matching column**: "Product/Service name" to identify the correct row to update
- **Updated data mapping**: Now updates `productBenefitsStructured`, `workflowStep`, and `timestamp` columns
- **Added `alwaysOutputData: true`** for better data flow

### 2. Updated "Save Brand Benefits to Excel" Node
- **Changed operation**: From `append` to `appendOrUpdate`
- **Changed target sheet**: From "BrandBenefits" to "Form Responses 1" (gid: 2138296752)
- **Added matching column**: "Product/Service name" to identify the correct row to update
- **Updated data mapping**: Now updates `Customer Benefits (Brand-level)`, `workflowStep`, and `timestamp` columns
- **Added `alwaysOutputData: true`** for better data flow

### 3. Updated Storage Nodes
- **"Store Product Benefits"**: Added `Product/Service name` field to enable row matching
- **"Store Brand Benefits"**: Added `Product/Service name` field to enable row matching

## How It Works Now

1. **Row Identification**: Uses the "Product/Service name" field as a unique identifier to find the correct row
2. **Update Operation**: Updates only the specified columns in the existing row instead of creating new rows
3. **Data Preservation**: All original form data remains intact while adding the AI-generated benefits

## Expected Behavior

- ✅ Product benefits will be saved to the `productBenefitsStructured` column in the same row as the original form submission
- ✅ Brand benefits will be saved to the `Customer Benefits (Brand-level)` column in the same row
- ✅ Workflow step and timestamp tracking for each operation
- ✅ No duplicate rows created

## Testing Notes

1. Ensure the "Product/Service name" in your form data exactly matches between submissions
2. The workflow will update the existing row based on this product name match
3. If no matching row is found, it will create a new row (appendOrUpdate behavior)

## Column Mappings

### Product Benefits Update:
- `productBenefitsStructured` ← JSON stringified product benefits
- `workflowStep` ← "A_ProductBenefits"  
- `timestamp` ← Current ISO timestamp

### Brand Benefits Update:
- `Customer Benefits (Brand-level)` ← JSON stringified brand benefits
- `workflowStep` ← "B_BrandBenefits"
- `timestamp` ← Current ISO timestamp

The workflow is now ready for import into n8n and should properly update existing rows instead of creating duplicates.

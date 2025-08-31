# Brand Context Repository - Data Reference Guide

## Overview

The **Brand Context Repository** is a centralized data consolidation node in the n8n workflow that organizes all brand-related information from Google Sheets into logical, accessible categories. This eliminates the need for multiple data fetches and provides clean access patterns for AI nodes throughout the workflow.

## Access Pattern

All data is accessed via: `$('Brand Context Repository').item.json.<category>.<field>`

---

## 📋 **TECHNICAL METADATA**

Core workflow and language configuration data.

| Field | Access Pattern | Type | Description |
|-------|---------------|------|-------------|
| `rawData` | `$('Brand Context Repository').item.json.rawData` | Object | Complete original form data (fallback access) |
| `workflowId` | `$('Brand Context Repository').item.json.workflowId` | String | Workflow execution identifier |
| `targetLanguages` | `$('Brand Context Repository').item.json.targetLanguages` | Array | All target output languages |
| `targetLanguage` | `$('Brand Context Repository').item.json.targetLanguage` | String | Primary target market language |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.targetLanguage }}
{{ $('Brand Context Repository').item.json.workflowId }}
```

---

## 🏢 **COMPANY DATA**

Organizational-level information about the company entity.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `companyName` | `$('Brand Context Repository').item.json.companyData.companyName` | Company name | Company name |
| `companyDescription` | `$('Brand Context Repository').item.json.companyData.companyDescription` | Company description/mission (short) | Company description / mission (short) |
| `companyOrigin` | `$('Brand Context Repository').item.json.companyData.companyOrigin` | Company's origin (heritage) | Company's Origin (Heritage) |
| `foundingSpark` | `$('Brand Context Repository').item.json.companyData.foundingSpark` | Founding spark (year/place) | Founding spark (year/place) |
| `firstBarrier` | `$('Brand Context Repository').item.json.companyData.firstBarrier` | First barrier & response | First barrier & response |
| `proofPoints` | `$('Brand Context Repository').item.json.companyData.proofPoints` | Proof points achieved | Proof points achieved |
| `personalVsCorporate` | `$('Brand Context Repository').item.json.companyData.personalVsCorporate` | Personal vs. Corporate Brand Impact (1-10 scale) | Personal vs. Corporate Brand Impact (1–10, the lower means more Personal) |
| `decisionMaking` | `$('Brand Context Repository').item.json.companyData.decisionMaking` | Decision-Making Style | Decision-Making Style (Organizational mindset) |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.companyData.companyName }}
{{ $('Brand Context Repository').item.json.companyData.foundingSpark }}
```

---

## 🎯 **BRAND DATA**

Brand strategy, positioning, and identity elements.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `brandName` | `$('Brand Context Repository').item.json.brandData.brandName` | Brand name (with fallbacks to company name) | Brand name \|\| Company name |
| `brandStage` | `$('Brand Context Repository').item.json.brandData.brandStage` | Brand lifecycle phase | Brand Stage (Lifecycle Phase) |
| `brandVision` | `$('Brand Context Repository').item.json.brandData.brandVision` | Brand Vision statement | Brand Vision |
| `brandMission` | `$('Brand Context Repository').item.json.brandData.brandMission` | Brand Mission statement | Brand Mission |
| `brandPurpose` | `$('Brand Context Repository').item.json.brandData.brandPurpose` | Brand Purpose statement | Brand Purpose |
| `brandAdvantage` | `$('Brand Context Repository').item.json.brandData.brandAdvantage` | Superior brand benefit | Brand Advantage (Superior Benefit) |
| `brandPosition` | `$('Brand Context Repository').item.json.brandData.brandPosition` | Brand position in market | Brand Position (in the Market Location) |
| `coreValues` | `$('Brand Context Repository').item.json.brandData.coreValues` | Core brand values | Core Values |
| `brandOrigin` | `$('Brand Context Repository').item.json.brandData.brandOrigin` | Brand origin story | Brand Origin \|\| Company's Origin (Heritage) |
| `growthBarrier` | `$('Brand Context Repository').item.json.brandData.growthBarrier` | Biggest growth barrier | Biggest Brand Growth Barrier |
| `futureGoals` | `$('Brand Context Repository').item.json.brandData.futureGoals` | Future brand goals (BHAGs) | Future of the Brand (BHAGs) |
| `environmentalPredictability` | `$('Brand Context Repository').item.json.brandData.environmentalPredictability` | Congru Model Axis A | Axis A — Environmental Predictability |
| `brandInfluence` | `$('Brand Context Repository').item.json.brandData.brandInfluence` | Congru Model Axis B | Axis B — Brand Influence / Ability to Act |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.brandData.brandName }}
{{ $('Brand Context Repository').item.json.brandData.brandStage }}
{{ $('Brand Context Repository').item.json.brandData.brandVision }}
```

---

## 📦 **PRODUCT DATA**

Product/service-specific information and descriptions.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `productName` | `$('Brand Context Repository').item.json.productData.productName` | Product/Service name | Product/Service name |
| `productDescriptionShort` | `$('Brand Context Repository').item.json.productData.productDescriptionShort` | Brief product description | Product description (short) |
| `productDescriptionDetailed` | `$('Brand Context Repository').item.json.productData.productDescriptionDetailed` | Detailed product description | Product description (detailed) |
| `targetMarket` | `$('Brand Context Repository').item.json.productData.targetMarket` | Primary target market | Product Target Market |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.productData.productName }}
{{ $('Brand Context Repository').item.json.productData.targetMarket }}
```

---

## 🏷️ **PRODUCT CLASSIFICATION (UNSPSC)**

United Nations Standard Products and Services Code classification for the product/service.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `unspscHierarchy` | `$('Brand Context Repository').item.json.productClassification.unspscHierarchy` | **Complete UNSPSC hierarchy with codes** | Generated from all UNSPSC fields |
| `unspscSegmentTitle` | `$('Brand Context Repository').item.json.productClassification.unspscSegmentTitle` | UNSPSC Segment Title | UNSPSC - Segment Title |
| `unspscSegmentCode` | `$('Brand Context Repository').item.json.productClassification.unspscSegmentCode` | UNSPSC Segment Code | UNSPSC - Segment Code |
| `unspscFamilyTitle` | `$('Brand Context Repository').item.json.productClassification.unspscFamilyTitle` | UNSPSC Family Title | UNSPSC - Family Title |
| `unspscFamilyCode` | `$('Brand Context Repository').item.json.productClassification.unspscFamilyCode` | UNSPSC Family Code | UNSPSC - Family Code |
| `unspscClassTitle` | `$('Brand Context Repository').item.json.productClassification.unspscClassTitle` | UNSPSC Class Title | UNSPSC - Class Title |
| `unspscClassCode` | `$('Brand Context Repository').item.json.productClassification.unspscClassCode` | UNSPSC Class Code | UNSPSC - Class Code |
| `unspscCommodityTitle` | `$('Brand Context Repository').item.json.productClassification.unspscCommodityTitle` | UNSPSC Commodity Title | UNSPSC - Commodity Title |
| `unspscCommodityCode` | `$('Brand Context Repository').item.json.productClassification.unspscCommodityCode` | UNSPSC Commodity Code | UNSPSC - Commodity Code |

**Hierarchy Format:**

```text
Segment Title (Code) > Family Title (Code) > Class Title (Code) > Commodity Title (Code)
```

**Example Output:**

```text
Live Plant and Animal Material and Accessories and Supplies (10000000) > Live animal (10100000) > Livestock (10101500) > Cattle (10101501)
```

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.productClassification.unspscHierarchy }}
{{ $('Brand Context Repository').item.json.productClassification.unspscCommodityTitle }}
```

---

## 🏭 **INDUSTRY CLASSIFICATION (ISIC)**

International Standard Industrial Classification for the industry/sector.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `isicHierarchy` | `$('Brand Context Repository').item.json.industryClassification.isicHierarchy` | **Complete ISIC hierarchy with codes** | Generated from all ISIC fields |
| `isicGroupTitle` | `$('Brand Context Repository').item.json.industryClassification.isicGroupTitle` | ISIC5 Group Title | ISIC5 - Group Title |
| `isicGroupCode` | `$('Brand Context Repository').item.json.industryClassification.isicGroupCode` | ISIC5 Group Code | ISIC5 - Group Code |
| `isicClassTitle` | `$('Brand Context Repository').item.json.industryClassification.isicClassTitle` | ISIC5 Class Title | ISIC5 - Class Title |
| `isicClassCode` | `$('Brand Context Repository').item.json.industryClassification.isicClassCode` | ISIC5 Class Code | ISIC5 - Class Code |
| `industryVertical` | `$('Brand Context Repository').item.json.industryClassification.industryVertical` | Industry vertical/ISIC code | Industry (vertical) / ISIC code |
| `industryFuture` | `$('Brand Context Repository').item.json.industryClassification.industryFuture` | Future of the industry | Future of the Industry |

**Hierarchy Format:**

```text
Group Title (Code) > Class Title (Code)
```

**Example Output:**

```text
Manufacture of food products (C10) > Manufacture of dairy products (C105)
```

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.industryClassification.isicHierarchy }}
{{ $('Brand Context Repository').item.json.industryClassification.industryFuture }}
```

---

## 👥 **CUSTOMER & MARKET DATA**

Target audience and market analysis information.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `customerType` | `$('Brand Context Repository').item.json.customerMarketData.customerType` | Type of customer | Type of customer |
| `marketGroups` | `$('Brand Context Repository').item.json.customerMarketData.marketGroups` | Market segments/groups | Market Groups |
| `valuableCustomers` | `$('Brand Context Repository').item.json.customerMarketData.valuableCustomers` | Most valuable customer segments | Most Valuable Customer Groups |
| `successGroups` | `$('Brand Context Repository').item.json.customerMarketData.successGroups` | Customer groups with proven success | Groups Where You've Succeeded |
| `customerBenefits` | `$('Brand Context Repository').item.json.customerMarketData.customerBenefits` | Brand-level customer benefits | Customer Benefits (Brand-level) |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.customerMarketData.customerType }}
{{ $('Brand Context Repository').item.json.customerMarketData.valuableCustomers }}
```

---

## 🔧 **Implementation Notes**

### Fallback Handling

All fields include fallback values to prevent workflow errors:

- String fields default to 'Unknown'
- Object fields maintain structure even with missing data
- Brand name has multiple fallback sources (Brand name → Company name → 'Unknown Brand')

### Data Types

- **String**: Simple text values
- **Object**: Nested data structures with sub-fields
- **Array**: List of values (e.g., target languages)

### Best Practices

1. **Use semantic access patterns**: Access data through the organized categories rather than rawData when possible
2. **Leverage hierarchies**: Use the pre-built hierarchy strings for clean, formatted classification data
3. **Maintain fallbacks**: The rawData object is always available as a fallback for any missing organized fields
4. **Consistent referencing**: Use the full access path for clarity in AI prompts

### Migration from Old Patterns

**Before (Old Pattern):**

```javascript
{{ $('Prepare Workflow Data').item.json.rawData['Brand name'] }}
{{ $('Prepare Workflow Data').item.json.rawData['UNSPSC - Segment Title'] }}
```

**After (New Pattern):**

```javascript
{{ $('Brand Context Repository').item.json.brandData.brandName }}
{{ $('Brand Context Repository').item.json.productClassification.unspscHierarchy }}
```

---

## 📊 **Summary Statistics**

- **Total Categories**: 6 main data categories
- **Total Fields**: 40+ organized data points
- **Hierarchy Fields**: 2 (UNSPSC + ISIC with codes)
- **Fallback Coverage**: 100% (all fields have fallback values)
- **Source Coverage**: All identified AI prompt variables included

---

## 🚀 **Benefits**

1. **Organized Structure**: Logical grouping makes data easy to find and use
2. **Clean Access**: Semantic field names replace complex rawData paths
3. **Enhanced Hierarchies**: Pre-built classification strings with codes
4. **Error Prevention**: Comprehensive fallback handling
5. **Performance**: Single data consolidation reduces multiple node queries
6. **Maintainability**: Clear documentation and consistent patterns
7. **Scalability**: Easy to extend with new categories or fields

---

*Last Updated: September 1, 2025*  
*Version: 2.0 - Reorganized Structure with Hierarchies*

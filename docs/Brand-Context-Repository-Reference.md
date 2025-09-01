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

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.workflowId }}
```

---

## 🏢 **COMPANY DATA**

Organizational-level information about the company entity.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `companyName` | `$('Brand Context Repository').item.json.companyData.companyName` | Company/organization name | Company/Organization Name |
| `companyHeadquarters` | `$('Brand Context Repository').item.json.companyData.companyHeadquarters` | Company headquarters location | Company headquarters (City, Country) |
| `companyAddress` | `$('Brand Context Repository').item.json.companyData.companyAddress` | Company address | Address |
| `companyPhone` | `$('Brand Context Repository').item.json.companyData.companyPhone` | Company phone number | Phone number |
| `foundingSpark` | `$('Brand Context Repository').item.json.companyData.foundingSpark` | Founding spark (year/place) | Founding spark (year/place) |
| `firstBarrier` | `$('Brand Context Repository').item.json.companyData.firstBarrier` | First barrier & response | First barrier & response |
| `proofPoints` | `$('Brand Context Repository').item.json.companyData.proofPoints` | Proof points achieved | Proof points achieved |
| `achievementYears` | `$('Brand Context Repository').item.json.companyData.achievementYears` | Achievement years/phases | Year(s) / Phase(s) |
| `industryBarrier` | `$('Brand Context Repository').item.json.companyData.industryBarrier` | Barrier/industry norm overcome | Barrier / Industry norm |
| `personalVsCorporate` | `$('Brand Context Repository').item.json.companyData.personalVsCorporate` | Personal vs. Corporate Brand Impact | Personal vs. Corporate Brand Impact |
| `decisionMaking` | `$('Brand Context Repository').item.json.companyData.decisionMaking` | Decision-Making Style | Decision-Making Style (Organizational mindset) |
| `multipleBrands` | `$('Brand Context Repository').item.json.companyData.multipleBrands` | Has multiple brands | Do you have more than one brand under the company? |
| `brandOrganization` | `$('Brand Context Repository').item.json.companyData.brandOrganization` | How brands are organized | How are your brands organized within the company? |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.companyData.companyName }}
{{ $('Brand Context Repository').item.json.companyData.companyHeadquarters }}
{{ $('Brand Context Repository').item.json.companyData.foundingSpark }}
```

---

## 🎯 **BRAND DATA**

Brand strategy, positioning, and identity elements.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `brandName` | `$('Brand Context Repository').item.json.brandData.brandName` | Brand name (with fallbacks to company name) | Brand name \|\| Company/Organization Name |
| `brandStage` | `$('Brand Context Repository').item.json.brandData.brandStage` | Brand lifecycle phase | Brand Stage (Lifecycle Phase) |
| `brandVision` | `$('Brand Context Repository').item.json.brandData.brandVision` | Brand Vision statement | Brand Vision |
| `brandMission` | `$('Brand Context Repository').item.json.brandData.brandMission` | Brand Mission statement | Brand Mission |
| `brandPurpose` | `$('Brand Context Repository').item.json.brandData.brandPurpose` | Brand Purpose statement | Brand Purpose |
| `brandAdvantage` | `$('Brand Context Repository').item.json.brandData.brandAdvantage` | Superior brand benefit | Brand Advantage (Superior Benefit) |
| `brandPosition` | `$('Brand Context Repository').item.json.brandData.brandPosition` | Brand position in market | Brand Position (in the Market Location) |
| `coreValues` | `$('Brand Context Repository').item.json.brandData.coreValues` | Core brand values | Core Values |
| `brandOrigin` | `$('Brand Context Repository').item.json.brandData.brandOrigin` | Brand origin story | Brand Origin |
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
| `targetLanguage` | `$('Brand Context Repository').item.json.productData.targetLanguage` | Primary target market language | Product Target Market Language |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.productData.productName }}
{{ $('Brand Context Repository').item.json.productData.targetMarket }}
{{ $('Brand Context Repository').item.json.productData.targetLanguage }}
```
{{ $('Brand Context Repository').item.json.productData.productName }}
{{ $('Brand Context Repository').item.json.productData.targetMarket }}
{{ $('Brand Context Repository').item.json.productData.unspscCategory }}
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
| `isicSectionTitle` | `$('Brand Context Repository').item.json.industryClassification.isicSectionTitle` | ISIC5 Section Title | ISIC5 - Section Title |
| `isicSectionCode` | `$('Brand Context Repository').item.json.industryClassification.isicSectionCode` | ISIC5 Section Code | ISIC5 - Section Code |
| `isicDivisionTitle` | `$('Brand Context Repository').item.json.industryClassification.isicDivisionTitle` | ISIC5 Division Title | ISIC5 - Division Title |
| `isicDivisionCode` | `$('Brand Context Repository').item.json.industryClassification.isicDivisionCode` | ISIC5 Division Code | ISIC5 - Division Code |
| `isicGroupTitle` | `$('Brand Context Repository').item.json.industryClassification.isicGroupTitle` | ISIC5 Group Title | ISIC5 - Group Title |
| `isicGroupCode` | `$('Brand Context Repository').item.json.industryClassification.isicGroupCode` | ISIC5 Group Code | ISIC5 - Group Code |
| `isicClassTitle` | `$('Brand Context Repository').item.json.industryClassification.isicClassTitle` | ISIC5 Class Title | ISIC5 - Class Title |
| `isicClassCode` | `$('Brand Context Repository').item.json.industryClassification.isicClassCode` | ISIC5 Class Code | ISIC5 - Class Code |
| `isicIncludes` | `$('Brand Context Repository').item.json.industryClassification.isicIncludes` | What this classification includes | ISIC5 - Includes |
| `isicIncludesAlso` | `$('Brand Context Repository').item.json.industryClassification.isicIncludesAlso` | Additional inclusions | ISIC5 - Includes Also |
| `isicExcludes` | `$('Brand Context Repository').item.json.industryClassification.isicExcludes` | What this classification excludes | ISIC5 - Excludes |
| `industryVertical` | `$('Brand Context Repository').item.json.industryClassification.industryVertical` | Industry vertical/ISIC code | Industry (vertical) / ISIC code |
| `industryFuture` | `$('Brand Context Repository').item.json.industryClassification.industryFuture` | Future of the industry | Future of the Industry |

**Hierarchy Format:**

```text
Section Title (Code) > Division Title (Code) > Group Title (Code) > Class Title (Code)
```

**Example Output:**

```text
Manufacturing (C) > Manufacture of food products (C10) > Manufacture of dairy products (C105) > Manufacture of milk and other dairy products (C1051)
```

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.industryClassification.isicHierarchy }}
{{ $('Brand Context Repository').item.json.industryClassification.industryFuture }}
{{ $('Brand Context Repository').item.json.industryClassification.isicIncludes }}
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

## 🌐 **DIGITAL PRESENCE DATA**

Website and social media presence information.

| Field | Access Pattern | Description | Source Field |
|-------|---------------|-------------|--------------|
| `website` | `$('Brand Context Repository').item.json.digitalPresence.website` | Brand/product website | Website representing the Brand/Product |
| `instagramUrl` | `$('Brand Context Repository').item.json.digitalPresence.instagramUrl` | Instagram profile URL | Instagram URL |
| `linkedinUrl` | `$('Brand Context Repository').item.json.digitalPresence.linkedinUrl` | LinkedIn profile URL | LinkedIn URL |

**Example Usage:**

```javascript
{{ $('Brand Context Repository').item.json.digitalPresence.website }}
{{ $('Brand Context Repository').item.json.digitalPresence.instagramUrl }}
```

---

## 🔧 **Implementation Notes**

### New Data Structure Mapping

The updated form structure includes several new fields that enhance data collection:

**Company Information:**
- Added: Company headquarters, address, phone number
- Added: Multiple brands indicator and brand organization structure

**Enhanced Product Classification:**
- Simplified UNSPSC to single category field (expandable to full hierarchy)
- Maintains support for detailed UNSPSC breakdown when available

**Digital Presence:**
- New category for website and social media URLs
- Supports brand representation across digital channels

### Fallback Handling

All fields include fallback values to prevent workflow errors:

- String fields default to 'Unknown'
- Object fields maintain structure even with missing data
- Brand name has multiple fallback sources (Brand name → Company/Organization Name → 'Unknown Brand')

### Data Types

- **String**: Simple text values
- **Object**: Nested data structures with sub-fields
- **Array**: List of values (e.g., target languages)

### Best Practices

1. **Use semantic access patterns**: Access data through the organized categories rather than rawData when possible
2. **Leverage hierarchies**: Use the pre-built hierarchy strings for clean, formatted classification data when available
3. **Maintain fallbacks**: The rawData object is always available as a fallback for any missing organized fields
4. **Consistent referencing**: Use the full access path for clarity in AI prompts
5. **Digital presence integration**: Use the new digitalPresence category for online brand representation

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
{{ $('Brand Context Repository').item.json.digitalPresence.website }}
```

---

## 📊 **Summary Statistics**

- **Total Categories**: 7 main data categories
- **Total Fields**: 61 organized data points (streamlined)
- **Hierarchy Fields**: 2 (UNSPSC + ISIC with full hierarchies)
- **Classification Levels**: 
  - UNSPSC: 4 levels (Segment > Family > Class > Commodity)
  - ISIC: 4 levels (Section > Division > Group > Class) + includes/excludes
- **Fallback Coverage**: 100% (all fields have fallback values)
- **Source Coverage**: All essential form fields mapped and organized
- **Focus**: Core business data without redundancy

---

## 🚀 **Benefits**

1. **Streamlined Structure**: Focused on essential business data without redundancy
2. **Comprehensive Classification**: Full UNSPSC and ISIC hierarchies with all levels
3. **Rich Context**: ISIC includes/excludes provide detailed classification context
4. **Enhanced Organization**: Support for multi-brand company structures
5. **Digital Integration**: Direct access to brand's online presence
6. **Organized Structure**: Logical grouping makes data easy to find and use
7. **Clean Access**: Semantic field names replace complex rawData paths
8. **Enhanced Hierarchies**: Pre-built classification strings with complete codes
9. **Error Prevention**: Comprehensive fallback handling
10. **Performance**: Single data consolidation reduces multiple node queries
11. **Maintainability**: Clear documentation and consistent patterns
12. **Scalability**: Easy to extend with new categories or fields

---

## 📋 **Updated Field Count Summary**

| Category | Fields | Notes |
|----------|--------|-------|
| Technical Metadata | 2 | Streamlined to essentials |
| Company Data | 12 | Complete contact & organizational info |
| Brand Data | 13 | Full brand strategy & positioning |
| Product Data | 5 | Core product info, no redundant classification |
| Product Classification (UNSPSC) | 9 | Complete 4-level hierarchy |
| Industry Classification (ISIC) | 14 | Complete 4-level hierarchy + context |
| Customer & Market Data | 5 | Target audience analysis |
| Digital Presence | 3 | Online brand representation |
| **Total** | **63** | **Optimized for business focus** |

**Key Features:**
- **Complete Classification**: Full UNSPSC and ISIC hierarchies handle all classification needs
- **No Redundancy**: UNSPSC category removed from product data (covered in classification section)
- **Business Focus**: Clean separation between product data and classification data
- **Logical Organization**: Each data type in its appropriate category

---

*Last Updated: September 1, 2025*  
*Version: 5.1 - Eliminated Redundancy, Pure Business Focus*

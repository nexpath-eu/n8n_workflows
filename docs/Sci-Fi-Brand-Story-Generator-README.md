# Sci-Fi Brand Story Generator - n8n Workflow

## Overview

This n8n workflow creates epic science fiction stories about brands and their products by collecting user input through a web form, fetching website data, and using AI to generate compelling narratives.

## Workflow Components

### 1. Brand Form Webhook (Trigger)
- **Type**: Webhook Trigger
- **Method**: POST
- **Path**: `brand-story-form`
- **Purpose**: Receives form data from the HTML form

### 2. Extract Form Data
- **Type**: Set Node
- **Purpose**: Extracts and structures the form data
- **Fields**:
  - brand_name
  - product_name
  - industry
  - person_name
  - location
  - product_website

### 3. Fetch Website Data
- **Type**: HTTP Request
- **Method**: GET
- **Purpose**: Fetches content from the product website
- **Headers**: Includes User-Agent to avoid blocking

### 4. Clean Website Content
- **Type**: Code Node (JavaScript)
- **Purpose**: 
  - Removes HTML tags, scripts, and styles
  - Extracts clean text content
  - Limits content to 2000 characters to avoid token limits
  - Combines form data with cleaned website content

### 5. Generate Sci-Fi Story
- **Type**: OpenAI Node
- **Model**: GPT-4
- **Max Tokens**: 1500
- **Temperature**: 0.8
- **Purpose**: Generates the science fiction story using AI
- **Prompt**: Comprehensive system prompt for sci-fi story generation

### 6. Format Final Response
- **Type**: Set Node
- **Purpose**: Formats the final response with structured data
- **Returns**:
  - story_title
  - generated_story
  - input_data
  - generation_timestamp
  - success status

## Setup Instructions

### Prerequisites
1. **n8n instance** running (locally or cloud)
2. **OpenAI API key** configured in n8n credentials
3. **Web server** to host the HTML form (optional for testing)

### Step 1: Import the Workflow
1. Open your n8n instance
2. Click "Import from JSON"
3. Copy the contents of `Sci_Fi_Brand_Story_Generator_v2.json`
4. Paste and import

### Step 2: Configure OpenAI Credentials
1. Go to n8n Settings > Credentials
2. Add new OpenAI credential
3. Enter your OpenAI API key
4. Test the connection

### Step 3: Activate the Workflow
1. Open the imported workflow
2. Click "Active" to enable the workflow
3. Note the webhook URL (will be displayed in the webhook node)

### Step 4: Update the HTML Form
1. Open `sci-fi-brand-story-form.html`
2. Replace the webhook URL in the JavaScript section:
   ```javascript
   const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';
   ```
3. Save the file

### Step 5: Test the Workflow
1. Open the HTML form in a web browser
2. Fill in all required fields:
   - Brand Name (e.g., "Tesla")
   - Product Name (e.g., "Model S")
   - Industry (e.g., "Automotive")
   - Key Person (e.g., "Elon Musk")
   - Location (e.g., "Austin, Texas")
   - Product Website (e.g., "https://www.tesla.com")
3. Click "Generate Sci-Fi Story"
4. Wait for the AI to generate your story

## Form Fields

### Required Inputs
- **Brand Name**: Official name of the brand
- **Product Name**: Specific product name
- **Industry**: Industry sector (dropdown with options)
- **Person Name**: Key person associated with the brand
- **Location**: Geographical location relevant to the brand
- **Product Website**: Official website URL

### AI Prompt Template
The workflow uses a sophisticated prompt that:
- Positions the AI as a futuristic historian and visionary storyteller
- Requests a 500-800 word science fiction story
- Integrates all provided data points seamlessly
- Creates an epic, visionary narrative tone
- Ensures a clear beginning, middle, and end

## Example Usage

### Input:
- Brand Name: SpaceX
- Product Name: Falcon Heavy
- Industry: Aerospace
- Person Name: Elon Musk
- Location: Cape Canaveral
- Website: https://www.spacex.com

### Expected Output:
An epic science fiction story that weaves these elements into a futuristic narrative, explaining how SpaceX and the Falcon Heavy evolved to become legendary in a sci-fi future, incorporating details from the website and creating an engaging historical account.

## Customization Options

### Modify the AI Prompt
Edit the "Generate Sci-Fi Story" node to:
- Change the story length (adjust max tokens)
- Modify the narrative style
- Add specific sci-fi elements (time periods, technology, etc.)
- Change the temperature for more/less creative output

### Add More Data Sources
Extend the workflow by adding:
- Social media data fetching
- News article analysis
- Additional website scraping
- Database lookups

### Enhance the Form
Modify the HTML form to include:
- More industry options
- File uploads (logos, images)
- Multiple person inputs
- Historical timeline inputs

## Error Handling

The workflow includes basic error handling:
- Website fetching failures are handled gracefully
- HTML content cleaning prevents parsing errors
- AI generation failures return error messages
- Form validation ensures required fields

## Security Considerations

1. **API Keys**: Keep your OpenAI API key secure
2. **Website Fetching**: The workflow fetches external content - monitor for abuse
3. **Input Validation**: Consider adding more validation for URLs and text inputs
4. **Rate Limiting**: Implement rate limiting if making this publicly available

## Troubleshooting

### Common Issues
1. **Webhook not receiving data**: Check the URL and ensure the workflow is active
2. **OpenAI errors**: Verify API key and account limits
3. **Website fetching fails**: Some sites block automated requests
4. **Story quality issues**: Adjust the prompt or temperature settings

### Debug Steps
1. Check n8n execution logs
2. Test each node individually
3. Verify webhook URL format
4. Check OpenAI API status

## Future Enhancements

1. **Multiple AI Models**: Support for different AI providers
2. **Story Templates**: Predefined story structures
3. **Image Generation**: Add AI-generated illustrations
4. **Export Options**: PDF, EPUB, or other formats
5. **Story Library**: Save and categorize generated stories
6. **Batch Processing**: Generate multiple stories at once

## Support

For issues or questions:
1. Check n8n documentation
2. Review OpenAI API documentation
3. Test with simple inputs first
4. Check browser console for JavaScript errors

## License

This workflow is provided as-is for educational and commercial use. Ensure compliance with OpenAI's terms of service and any applicable regulations.

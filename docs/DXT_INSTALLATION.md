# Whippy AI MCP Desktop Extension Installation Guide

This guide will help you install the Whippy AI MCP server as a Desktop Extension (DXT) in Claude Desktop.

## 🚀 Quick Start

### Prerequisites

1. **Claude Desktop**: Make sure you have the latest version of Claude Desktop installed
2. **Whippy AI Account**: Sign up at [Whippy.ai](https://whippy.ai) and get your API key
3. **Node.js**: Version 20 or higher (for building the extension)

### Step 1: Build the DXT Package

1. **Clone or download this repository**:
   ```bash
   git clone https://github.com/your-username/whippy-mcp.git
   cd whippy-mcp
   ```

2. **Run the build script**:
   ```bash
   ./build-dxt.sh
   ```

   This will create a `whippy-ai-mcp.dxt` file in your project directory.

### Step 2: Install in Claude Desktop

1. **Open Claude Desktop**

2. **Navigate to Extensions**:
   - Go to **Settings** (gear icon)
   - Click on **Extensions** in the sidebar

3. **Install the Extension**:
   - Click **"Install from file"**
   - Select the `whippy-ai-mcp.dxt` file you just created
   - Click **"Install"**

4. **Configure the Extension**:
   - After installation, click on the **Whippy AI MCP** extension
   - Enter your **Whippy API key** in the configuration
   - Optionally set a custom **base URL** (defaults to `https://api.whippy.co/v1`)
   - Click **"Save"**

### Step 3: Verify Installation

1. **Restart Claude Desktop** to ensure the extension loads properly

2. **Test the Extension**:
   - Start a new conversation
   - Try asking: *"List my contacts from Whippy"*
   - Or: *"Send an SMS to +1234567890 saying 'Hello from Claude!'"*

## 🔧 Manual Build Process

If the build script doesn't work, you can build manually:

### 1. Create Build Directory
```bash
mkdir dxt-build
cd dxt-build
```

### 2. Copy Files
```bash
cp ../dxt-index.js .
cp ../src/lib/whippy-client.js .
cp ../dxt-package.json package.json
cp ../manifest.json .
```

### 3. Install Dependencies
```bash
npm install --production
```

### 4. Create DXT Package
```bash
npx @anthropic-ai/dxt pack . --output ../whippy-ai-mcp.dxt
```

## 📋 Available Tools

Once installed, you'll have access to these tools:

### Contact Management
- **`create_contact`**: Create new contacts
- **`get_contact`**: Retrieve contact details
- **`list_contacts`**: List contacts with pagination

### Messaging
- **`send_sms`**: Send SMS messages
- **`send_email`**: Send email messages

### Campaign Management
- **`create_campaign`**: Create marketing campaigns
- **`get_campaign`**: Get campaign details
- **`list_campaigns`**: List all campaigns
- **`send_campaign`**: Send campaigns immediately

### Lead Management
- **`create_lead`**: Create new leads

### Conversation Management
- **`get_conversation`**: Get conversation details
- **`list_conversations`**: List conversations

### Analytics
- **`get_campaign_analytics`**: Get campaign performance metrics

## 🎯 Usage Examples

### Contact Management
```
Create a new contact named "John Doe" with email "john@example.com" and phone "+1234567890"
```

```
List all contacts, showing 10 contacts per page
```

```
Get contact details for contact ID "abc123"
```

### Messaging
```
Send an SMS to +1234567890 saying "Hello from Claude Desktop!"
```

```
Send an email to john@example.com with subject "Welcome" and message "Thanks for signing up!"
```

### Campaign Management
```
Create a new campaign called "Summer Sale" with message "Get 50% off all items this summer!"
```

```
Send campaign with ID "xyz789" immediately
```

```
Get analytics for campaign ID "xyz789"
```

## 🔒 Security & Configuration

### API Key Management
- Your Whippy API key is stored securely using your operating system's secure storage
- On macOS: Keychain
- On Windows: Credential Manager
- The key is encrypted and never stored in plain text

### Configuration Options
- **`whippy_api_key`** (required): Your Whippy AI API key
- **`whippy_base_url`** (optional): Custom API endpoint (defaults to `https://api.whippy.co/v1`)

## 🐛 Troubleshooting

### Extension Won't Install
- Ensure you're running the latest version of Claude Desktop
- Check that the `.dxt` file isn't corrupted
- Verify you have sufficient disk space

### Tools Not Available
- Restart Claude Desktop after installation
- Check the extension configuration for missing API key
- Verify your Whippy API key is valid

### Configuration Issues
- Navigate to Settings > Extensions
- Click on the Whippy AI MCP extension
- Ensure all required fields are completed
- Check that your API key is entered correctly

### Permission Errors
- On macOS: Check System Preferences > Security & Privacy
- On Windows: Ensure Claude Desktop has necessary permissions
- For enterprise environments: Verify desktop extensions are enabled

## 🔄 Updates

### Updating the Extension
1. Build a new `.dxt` file using the build script
2. Uninstall the old extension from Claude Desktop
3. Install the new `.dxt` file
4. Reconfigure your API key

### Automatic Updates
Extensions from the official directory update automatically. For privately distributed extensions like this one, you'll need to manually install updated versions.

## 📞 Support

### Getting Help
- **Whippy AI Documentation**: [docs.whippy.ai](https://docs.whippy.ai)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Claude Desktop Support**: [support.anthropic.com](https://support.anthropic.com)

### Common Issues
1. **"API Key Invalid"**: Verify your Whippy API key is correct and has the required permissions
2. **"Server Not Found"**: Check that the extension is properly installed and configured
3. **"Tools Not Appearing"**: Restart Claude Desktop and verify the extension is enabled

## 🎉 Success!

Once installed and configured, you'll have powerful Whippy AI capabilities directly integrated into Claude Desktop. You can now:

- Manage contacts and leads
- Send SMS and email messages
- Create and manage marketing campaigns
- Track analytics and performance
- Handle customer conversations

All through natural language conversations with Claude!

---

**Need help?** Open an issue on the GitHub repository or reach out to the community! 
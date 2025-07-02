# Whippy AI MCP Server

A Model Context Protocol (MCP) server that provides AI services with access to the Whippy AI Public API for managing contacts, campaigns, messaging, and more. This server can be deployed on Vercel for global accessibility or installed as a Claude Desktop Extension (DXT).

## 🚀 Features

### Contact Management

- ✅ Create, read, update, and delete contacts
- 📋 List contacts with pagination
- 🏷️ Tag management and custom fields

### Messaging

- 📱 Send SMS messages
- 📧 Send emails
- 💬 Conversation management

### Campaign Management

- 🚀 Create and manage campaigns
- 📊 Campaign analytics
- ⏰ Schedule campaigns
- 🎯 Target-specific contacts

### Lead Management

- 🎯 Create and track leads
- 📈 Lead source tracking
- 🔄 Lead status management

### Analytics

- 📊 Campaign performance metrics
- 📈 Delivery and engagement rates
- 💡 Actionable insights

## 🛠️ Setup

### Prerequisites

1. **Whippy AI Account**: Sign up at [Whippy.ai](https://whippy.ai)
2. **API Key**: Generate an API key from your Whippy dashboard
3. **Vercel Account**: For deployment (free tier available)
4. **Claude Desktop**: For DXT installation (optional)
5. **Node.js**: Version 20 or higher

### Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hellowhippy/whippy-mcp.git
   cd whippy-mcp
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file:

   ```bash
   WHIPPY_API_KEY=your_whippy_api_key_here
   ```

4. **Build the project**:

   ```bash
   yarn build
   ```

5. **Test locally**:
   ```bash
   yarn dev
   ```

## 🚀 Deployment on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hellowhippy/whippy-mcp)

### Manual Deployment

1. **Connect to Vercel**:

   ```bash
   npx vercel
   ```

2. **Set environment variables in Vercel**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable: `WHIPPY_API_KEY`

3. **Deploy**:
   ```bash
   npx vercel --prod
   ```

Your MCP server will be available at: `https://your-project.vercel.app`

## 🖥️ Claude Desktop Extension (DXT)

### Installation

1. **Build the DXT package**:

   ```bash
   chmod +x build-dxt.sh
   ./build-dxt.sh
   ```

2. **Install in Claude Desktop**:
   - Open Claude Desktop
   - Go to Settings > Extensions
   - Click "Install from file"
   - Select the generated `whippy-ai-mcp.dxt` file
   - Configure your Whippy API key in the extension settings

### DXT Configuration

The extension will prompt you to configure:

- **Whippy API Key**: Your Whippy AI API key
- **Base URL**: Whippy API base URL (optional, defaults to production)

For detailed installation instructions, see [docs/DXT_INSTALLATION.md](docs/DXT_INSTALLATION.md).

## 🔧 Configuration

### AI Client Setup

#### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "whippy-ai": {
      "url": "https://your-project.vercel.app/api/mcp"
    }
  }
}
```

#### Cursor IDE

Add to your MCP settings:

```json
{
  "mcpServers": {
    "whippy-ai": {
      "url": "https://your-project.vercel.app/api/mcp"
    }
  }
}
```

#### Cline

Add to your `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "whippy-ai": {
      "command": "npx",
      "args": ["mcp-remote", "https://your-project.vercel.app/api/mcp"],
      "transportType": "Streamable HTTP"
    }
  }
}
```

## 📖 Usage Examples

### Contact Management

```
Create a new contact named John Doe with email john@example.com and phone +1234567890
```

```
List all contacts with pagination, showing 10 contacts per page
```

```
Get contact details for contact ID: abc123
```

### Messaging

```
Send an SMS to +1234567890 saying "Hello from Whippy AI!"
```

```
Send an email to john@example.com with subject "Welcome" and message "Thanks for signing up!"
```

### Campaign Management

```
Create a new campaign called "Summer Sale" with message "Get 50% off all items this summer!"
```

```
Send campaign with ID xyz789 immediately
```

```
Get analytics for campaign ID xyz789
```

### Lead Management

```
Create a new lead with name Sarah Johnson, email sarah@example.com, source "website", and status "new"
```

## 🔧 Available Tools

| Tool                     | Description                        | Parameters                               |
| ------------------------ | ---------------------------------- | ---------------------------------------- |
| `create_contact`         | Create a new contact               | name, email, phone                       |
| `get_contact`            | Get contact by ID                  | contact_id                               |
| `list_contacts`          | List contacts with pagination      | offset, limit                            |
| `send_sms`               | Send SMS message                   | to, message, from                        |
| `send_email`             | Send email                         | to, subject, message, from               |
| `create_campaign`        | Create new campaign                | name, message, contact_ids, scheduled_at |
| `list_campaigns`         | List all campaigns                 | -                                        |
| `send_campaign`          | Send campaign immediately          | campaign_id                              |
| `create_lead`            | Create new lead                    | name, email, phone, source, status       |
| `list_conversations`     | List conversations with pagination | offset, limit                            |
| `get_conversation`       | Get conversation by ID             | conversation_id                          |
| `get_campaign_analytics` | Get campaign analytics             | campaign_id                              |

## 🔒 Security

- **API Key Protection**: Store your Whippy API key securely in environment variables
- **HTTPS Only**: All communications are encrypted
- **Rate Limiting**: Respects Whippy API rate limits
- **Error Handling**: Comprehensive error handling and logging

## 📊 Monitoring

### Vercel Analytics

Monitor your MCP server performance:

- Response times
- Error rates
- Usage patterns
- Geographic distribution

### Whippy Analytics

Track your messaging and campaign performance:

- Delivery rates
- Open rates
- Response rates
- Conversion metrics

## 🛠️ Development

### Project Structure

```
whippy-mcp/
├── api/
│   └── [transport]/
│       └── route.ts          # MCP server endpoint
├── docs/                     # Documentation
│   ├── DEPLOYMENT.md         # Deployment guide
│   ├── DEVELOPMENT_SUMMARY.md # Development overview
│   ├── DXT_INSTALLATION.md   # DXT installation guide
│   ├── PROJECT_SUMMARY.md    # Project overview
│   └── REFACTORING_SUMMARY.md # Refactoring details
├── src/
│   ├── lib/
│   │   ├── mcp-tools.ts      # Centralized MCP tools
│   │   └── whippy-client.ts  # Whippy API client
│   └── types/
│       └── whippy.ts         # TypeScript types
├── dxt-index.ts              # DXT entry point
├── build-dxt.sh              # DXT build script
├── dxt-package.json          # DXT package configuration
├── manifest.json             # DXT manifest
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

### Development Scripts

```bash
# Type checking
yarn type              # Check TypeScript types
yarn build            # Build the project

# Code quality
yarn lint             # Fix linting issues automatically
yarn lint:check       # Check linting without fixing
yarn format           # Format code with Prettier
yarn format:check     # Check formatting without fixing
yarn lint:spell       # Check spelling with CSpell

# CI pipeline
yarn ci               # Run all checks (type, lint, format, spell)

# Development
yarn dev              # Start development server
```

### Code Quality Tools

- **TypeScript**: Full type safety and modern JavaScript features
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting
- **CSpell**: Spell checking for code and documentation

### GitHub Actions CI/CD

The project includes a comprehensive CI pipeline that:

- ✅ Runs on Node.js 20
- ✅ Performs type checking
- ✅ Runs linting checks
- ✅ Validates code formatting
- ✅ Checks spelling
- ✅ Builds the project

### Adding New Features

1. **Add new types** in `src/types/whippy.ts`
2. **Extend the client** in `src/lib/whippy-client.ts`
3. **Add new tools** in `src/lib/mcp-tools.ts`
4. **Run quality checks**: `yarn ci`
5. **Test thoroughly** before deployment

### Code Organization

The project has been refactored to eliminate code duplication:

- **Centralized Tools**: All MCP tools are defined in `src/lib/mcp-tools.ts`
- **Shared Logic**: Both Vercel deployment and DXT extension use the same tool definitions
- **TypeScript Only**: Removed JavaScript duplicates for cleaner maintenance

### Pre-commit Workflow

Before committing code, run:

```bash
# Fix any issues automatically
yarn lint
yarn format

# Verify everything passes
yarn ci
```

## 🐛 Troubleshooting

### Common Issues

1. **API Key Invalid**:
   - Verify your Whippy API key is correct
   - Check if the key has the required permissions

2. **Deployment Fails**:
   - Ensure all dependencies are listed in package.json
   - Check Vercel logs for specific errors

3. **Tools Not Appearing**:
   - Verify your MCP client configuration
   - Check the server URL is accessible
   - Restart your AI client

### Debug Mode

Enable debug logging by setting:

```bash
DEBUG=true
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **Whippy AI Documentation**: [docs.whippy.ai](https://docs.whippy.ai)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Claude Desktop Extensions**: [docs.anthropic.com](https://docs.anthropic.com/claude/docs/desktop-extensions)

## 🌟 Acknowledgments

- [Whippy AI](https://whippy.ai) for providing the excellent API
- [Anthropic](https://anthropic.com) for developing the Model Context Protocol
- [Vercel](https://vercel.com) for the deployment platform

---

Built with ❤️ for the AI development community

```sh
node scripts/test-client.mjs https://mcp-on-vercel.vercel.app
```

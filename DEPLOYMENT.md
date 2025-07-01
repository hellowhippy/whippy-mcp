# Deployment Guide: Whippy AI MCP Server

This guide provides step-by-step instructions for deploying your Whippy AI MCP Server to Vercel and configuring it with various AI clients.

## 📋 Prerequisites

Before starting the deployment process, ensure you have:

1. **Whippy AI Account & API Key**
   - Sign up at [Whippy.ai](https://whippy.ai)
   - Navigate to Settings → API Keys
   - Generate a new API key
   - Keep this key secure - you'll need it for deployment

2. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Free tier is sufficient for most use cases

3. **GitHub Account**
   - For code repository hosting
   - Enables automatic deployments

## 🚀 Step 1: Repository Setup

### Option A: Fork this Repository

1. Click the "Fork" button on the GitHub repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/whippy-ai-mcp-server.git
   cd whippy-ai-mcp-server
   ```

### Option B: Create New Repository

1. Create a new repository on GitHub
2. Clone the template code
3. Push to your new repository

## 🔧 Step 2: Local Configuration

1. **Install dependencies**:

   ```bash
   yarn install
   ```

2. **Create environment file**:

   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables**:
   Edit `.env.local`:

   ```bash
   WHIPPY_API_KEY=your_actual_whippy_api_key_here
   ```

4. **Test locally** (optional):
   ```bash
   yarn build
   yarn dev
   ```

## ☁️ Step 3: Vercel Deployment

### Method 1: One-Click Deploy

1. Click the "Deploy with Vercel" button in the README
2. Connect your GitHub account
3. Import the repository
4. Configure environment variables (see Step 4)
5. Deploy

### Method 2: Manual Deployment

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

   Follow the prompts to:
   - Link to existing project or create new
   - Configure project settings
   - Deploy

4. **Production deployment**:
   ```bash
   vercel --prod
   ```

## 🔐 Step 4: Environment Variables

### In Vercel Dashboard:

1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variables:

| Variable         | Value                             | Required |
| ---------------- | --------------------------------- | -------- |
| `WHIPPY_API_KEY` | Your Whippy AI API key            | Yes      |
| `DEBUG`          | `false` (or `true` for debugging) | No       |

### Security Notes:

- ✅ Never commit API keys to your repository
- ✅ Use Vercel's encrypted environment variables
- ✅ Rotate API keys regularly
- ✅ Monitor API usage in Whippy dashboard

## 🔗 Step 5: Get Your MCP Server URL

After successful deployment, you'll get URLs like:

- **Production**: `https://your-project-name.vercel.app`
- **Preview**: `https://your-project-name-git-branch.vercel.app`

Your MCP endpoints will be:

- **HTTP Transport**: `https://your-project-name.vercel.app/api/mcp`
- **SSE Transport**: `https://your-project-name.vercel.app/api/sse`

## 🤖 Step 6: Configure AI Clients

### Claude Desktop

1. **Locate config file**:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add configuration**:

   ```json
   {
     "mcpServers": {
       "whippy-ai": {
         "url": "https://your-project-name.vercel.app/api/mcp"
       }
     }
   }
   ```

3. **Restart Claude Desktop**

### Cursor IDE

1. **Open Cursor Settings**
2. **Navigate to MCP Settings**
3. **Add server configuration**:
   ```json
   {
     "mcpServers": {
       "whippy-ai": {
         "url": "https://your-project-name.vercel.app/api/mcp"
       }
     }
   }
   ```

### Cline

1. **Create/edit** `cline_mcp_settings.json`:
   ```json
   {
     "mcpServers": {
       "whippy-ai": {
         "command": "npx",
         "args": ["mcp-remote", "https://your-project-name.vercel.app/api/mcp"],
         "transportType": "Streamable HTTP"
       }
     }
   }
   ```

### Other MCP Clients

For other MCP-compatible clients, use:

- **Server URL**: `https://your-project-name.vercel.app/api/mcp`
- **Transport**: HTTP/HTTPS
- **Protocol**: MCP 1.0

## ✅ Step 7: Verify Deployment

### Test Server Accessibility

```bash
curl https://your-project-name.vercel.app/api/mcp
```

### Test in AI Client

Try these commands in your AI client:

```
List all contacts from Whippy
```

```
Create a test contact with name "Test User" and email "test@example.com"
```

### Expected Response

You should see:

- ✅ Server responds to requests
- ✅ Tools are available in AI client
- ✅ API calls to Whippy work correctly
- ✅ Error handling works properly

## 📊 Step 8: Monitoring & Maintenance

### Vercel Analytics

1. Enable Analytics in Vercel dashboard
2. Monitor:
   - Response times
   - Error rates
   - Usage patterns
   - Geographic distribution

### Whippy API Monitoring

1. Check API usage in Whippy dashboard
2. Monitor rate limits
3. Track API costs
4. Review error logs

### Logs & Debugging

- **Vercel Logs**: Available in dashboard under "Functions" tab
- **Debug Mode**: Set `DEBUG=true` in environment variables
- **Error Tracking**: Monitor 4xx/5xx responses

## 🔄 Step 9: Updates & Maintenance

### Automatic Deployments

- Push to `main` branch triggers production deployment
- Push to other branches creates preview deployments

### Manual Updates

```bash
# Pull latest changes
git pull origin main

# Deploy to production
vercel --prod
```

### Version Management

- Tag releases: `git tag v1.0.0`
- Use semantic versioning
- Document changes in commit messages

## 🐛 Troubleshooting

### Common Issues

1. **"API Key Invalid" Error**
   - Verify `WHIPPY_API_KEY` is set correctly in Vercel
   - Check API key permissions in Whippy dashboard
   - Ensure no extra spaces in environment variable

2. **"Server Not Found" Error**
   - Verify deployment was successful
   - Check Vercel function logs
   - Ensure correct URL in client configuration

3. **"Tools Not Appearing" in AI Client**
   - Restart AI client after configuration
   - Verify MCP server URL is accessible
   - Check client-specific configuration format

4. **Rate Limiting Issues**
   - Monitor API usage in Whippy dashboard
   - Implement exponential backoff
   - Consider upgrading Whippy plan

### Debug Steps

1. Check Vercel function logs
2. Test server endpoint directly
3. Verify environment variables
4. Review AI client configuration
5. Check Whippy API status

### Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Whippy Support**: [support@whippy.ai](mailto:support@whippy.ai)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)

## 🎉 Success!

Your Whippy AI MCP Server is now deployed and ready to enhance your AI workflows with powerful communication and marketing automation capabilities!

### Next Steps

- Explore all available tools
- Create custom workflows
- Monitor usage and performance
- Contribute improvements back to the project

---

**Need help?** Open an issue on GitHub or reach out to the community!

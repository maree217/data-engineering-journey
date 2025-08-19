# 🚀 GitHub Pages Deployment Guide

## Quick Deploy to GitHub Pages

### **Option 1: Automatic Deployment (Recommended)**

1. **Fork the Repository**
   ```bash
   # Go to: https://github.com/your-username/data-ai-course
   # Click "Fork" button
   ```

2. **Enable GitHub Pages**
   - Go to your forked repository
   - Click **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
   - Click **Save**

3. **Your Site is Live! 🎉**
   - URL: `https://your-username.github.io/data-ai-course/`
   - Updates automatically on every push to main branch

### **Option 2: Custom Domain Setup**

1. **Add Custom Domain (Optional)**
   ```bash
   # In repository root, create CNAME file
   echo "your-domain.com" > CNAME
   ```

2. **Configure DNS**
   - Add CNAME record pointing to: `your-username.github.io`
   - Wait for DNS propagation (5-10 minutes)

3. **Enable HTTPS**
   - GitHub Pages automatically provides SSL
   - Check "Enforce HTTPS" in Settings → Pages

---

## 📁 Site Structure

```
data-ai-course/
├── index.html                 # 🏠 Landing page
├── assets/
│   ├── css/landing.css       # 🎨 Landing page styles
│   └── js/landing.js         # ⚡ Landing page scripts
├── phase1-traditional/
│   └── html-dashboard/       # 🏛️ Phase 1 demo
├── phase2-modern/
│   └── mlops-pipeline/       # ☁️ Phase 2 demo
├── phase3-ai-driven/
│   └── vector-search/        # 🤖 Phase 3 demo
├── _config.yml              # ⚙️ Jekyll configuration
└── .github/workflows/       # 🔄 Auto-deployment
```

---

## 🔧 Advanced Configuration

### **Jekyll Configuration (_config.yml)**

```yaml
# Update these values for your site
title: "Your Data Engineering Journey"
description: "Your custom description"
url: "https://your-username.github.io"
baseurl: "/your-repo-name"

# Author information
author:
  name: "Your Name"
  email: "your-email@example.com"
  github: "your-username"
```

### **Custom Styling**

```css
/* Add to assets/css/landing.css */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-secondary-color;
}

.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}
```

### **Analytics Integration**

```yaml
# In _config.yml
google_analytics: "G-XXXXXXXXXX"
```

```html
<!-- Add to index.html <head> -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔍 SEO Optimization

### **Meta Tags (Already Included)**
```html
<meta name="description" content="Complete hands-on data engineering course">
<meta name="keywords" content="data engineering, AI, machine learning, course">
<meta property="og:title" content="Data Engineering Journey">
<meta property="og:description" content="From Traditional to AI-Driven Systems">
<meta property="og:image" content="https://your-site.com/og-image.jpg">
```

### **Sitemap Generation**
GitHub Pages automatically generates sitemap.xml with the jekyll-sitemap plugin.

### **Robots.txt**
```txt
# Create robots.txt in root
User-agent: *
Allow: /

Sitemap: https://your-username.github.io/data-ai-course/sitemap.xml
```

---

## 📊 Performance Optimization

### **Image Optimization**
```bash
# Optimize images before deployment
npx imagemin assets/images/* --out-dir=assets/images/optimized
```

### **CSS/JS Minification**
```json
// Add to package.json
"scripts": {
  "build": "npm run minify-css && npm run minify-js",
  "minify-css": "cleancss -o assets/css/landing.min.css assets/css/landing.css",
  "minify-js": "terser assets/js/landing.js -o assets/js/landing.min.js"
}
```

### **Caching Headers**
GitHub Pages automatically sets appropriate cache headers for static assets.

---

## 🔄 Continuous Deployment

### **Automatic Updates**

The `.github/workflows/deploy.yml` file ensures:
- ✅ Automatic deployment on push to main
- ✅ Dependency installation
- ✅ Asset building
- ✅ Error handling

### **Build Status**
Add build status badge to README:
```markdown
[![Deploy to GitHub Pages](https://github.com/your-username/data-ai-course/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/data-ai-course/actions/workflows/deploy.yml)
```

### **Manual Deployment**
```bash
# Trigger manual deployment
gh workflow run deploy.yml
```

---

## 🐛 Troubleshooting

### **Common Issues**

**❌ "404 - Page not found"**
- Check repository name matches URL
- Ensure `index.html` is in root directory
- Verify GitHub Pages is enabled in settings

**❌ "Site not updating"**
- Check Actions tab for build errors
- Clear browser cache (Ctrl+F5)
- Wait 5-10 minutes for deployment

**❌ "CSS/JS not loading"**
- Check file paths are relative to root
- Verify files exist in repository
- Check browser console for 404 errors

**❌ "Build failing"**
- Review GitHub Actions logs
- Check YAML syntax in _config.yml
- Ensure all dependencies are listed

### **Debug Commands**

```bash
# Test locally with Jekyll
gem install bundler jekyll
bundle install
bundle exec jekyll serve --livereload

# Check site accessibility
curl -I https://your-username.github.io/data-ai-course/

# Validate HTML
npx html-validate index.html

# Test performance
npx lighthouse https://your-username.github.io/data-ai-course/
```

---

## 📈 Monitoring & Analytics

### **GitHub Pages Insights**
- Go to repository **Insights** → **Traffic**
- View page views and unique visitors
- Monitor popular content

### **Google Analytics Setup**
1. Create GA4 property
2. Add tracking ID to `_config.yml`
3. View real-time data in GA dashboard

### **Performance Monitoring**
```javascript
// Add to landing.js
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
});
```

---

## 🔒 Security Best Practices

### **Content Security Policy**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### **Secure Headers**
GitHub Pages automatically adds security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

### **HTTPS Enforcement**
Always enable "Enforce HTTPS" in GitHub Pages settings.

---

## 🎯 Launch Checklist

### **Pre-Launch**
- [ ] Repository forked and configured
- [ ] GitHub Pages enabled
- [ ] Custom domain configured (if applicable)
- [ ] _config.yml updated with your information
- [ ] All demo links working
- [ ] Mobile responsiveness tested
- [ ] Performance optimized

### **Post-Launch**
- [ ] Analytics configured
- [ ] SEO metadata verified
- [ ] Social media sharing tested
- [ ] Error monitoring setup
- [ ] Backup strategy implemented
- [ ] Documentation updated

---

## 🆘 Support Resources

### **GitHub Pages Documentation**
- [Official Guide](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### **Community Support**
- [GitHub Discussions](https://github.com/your-username/data-ai-course/discussions)
- [Jekyll Community](https://talk.jekyllrb.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)

---

**🎉 Your Data Engineering Journey is now live and ready to transform careers worldwide!**

**Site URL**: `https://your-username.github.io/data-ai-course/`

Share your course and help others master AI-driven data engineering! 🚀
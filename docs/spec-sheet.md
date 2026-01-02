# Daily Gratitude - Commonplace Log
## Technical Specification Document

---

## Project Overview

**Project Name:** Daily Gratitude  
**Repository:** https://github.com/brennanbrown/commonplace  
**Live URL:** log.brennan.day  
**Static Site Generator:** Eleventy (11ty)  
**Design Philosophy:** Brutalist, ultra-minimal, accessibility-first  

---

## Design Specifications

### Color Palette (Gruvbox Dark)

```css
--bg-primary: #282828;      /* Main background */
--bg-secondary: #3c3836;    /* Subtle background accent */
--fg-primary: #ebdbb2;      /* Main text */
--fg-dim: #a89984;          /* Dimmed text */

--accent-gratitude: #fabd2f;  /* Yellow */
--accent-books: #83a598;      /* Blue */
--accent-videos: #d3869b;     /* Purple */
--accent-music: #8ec07c;      /* Aqua */
--accent-locations: #fe8019;  /* Orange */
--accent-quotes: #b8bb26;     /* Green */
--accent-notes: #fb4934;      /* Red */
```

### Typography

**Primary Font:** `monospace` system font stack
```css
font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace;
```

**Font Sizes:**
- Base: 16px (1rem)
- Small: 14px (0.875rem)
- Large: 18px (1.125rem)

**Line Height:** 1.6

### Layout

**Container Width:** 600px (fixed, centered)  
**Padding:** 20px  
**Spacing Unit:** 1rem (16px)

**No responsive breakpoints** - fixed width works on all devices through horizontal scroll if needed

---

## File Structure

```
commonplace/
├── .eleventy.js
├── package.json
├── .gitignore
├── README.md
├── src/
│   ├── _includes/
│   │   ├── base.njk
│   │   └── post.njk
│   ├── _data/
│   │   └── site.json
│   ├── css/
│   │   └── style.css
│   ├── posts/
│   │   ├── 2025-01-01.md
|   |   ├── 2025-01-02.md
|   |   ├── ...
│   │   └── posts.json
│   └── index.njk
└── _site/ (generated)
```

---

## Content Structure

### Post Front Matter Schema

```yaml
---
date: 2025-01-01
title: "Optional post title"
gratitude: "Optional gratitude post"
books:
  - title: "Book Title"
    author: "Author Name"
    status: "reading|finished|dnf"
    pages: 42
videos:
  - title: "Video Title"
    creator: "Creator Name"
    url: "https://..."
    duration: "1h 23m"
music:
  - title: "Song/Album Title"
    artist: "Artist Name"
    album: "Album Name"
    plays: 3
locations:
  - name: "Location Name"
    city: "City"
    notes: "Brief notes"
quotes:
  - text: "The quote text"
    author: "Author Name"
    source: "Book/Article/etc"
notes:
  - "Free-form note or observation"
---
```

### Example Full Post Template

```markdown
---
date: 2025-01-01
title: "January 1, 2025"
gratitude: "My morning coffee tasted perfect today. Small moments of warmth matter."

books:
  - title: "The Dispossessed"
    author: "Ursula K. Le Guin"
    status: "reading"
    pages: 87
  - title: "Debt: The First 5000 Years"
    author: "David Graeber"
    status: "finished"

videos:
  - title: "Building Accessible Web Components"
    creator: "Kevin Powell"
    url: "https://youtube.com/..."
    duration: "45m"
  - title: "The Philosophy of Time Management"
    creator: "Philosophy Tube"
    url: "https://youtube.com/..."
    duration: "1h 12m"

music:
  - title: "The Hazards of Love"
    artist: "The Decemberists"
    album: "The Hazards of Love"
    plays: 2
  - title: "Pyramid Song"
    artist: "Radiohead"
    album: "Amnesiac"
    plays: 5

locations:
  - name: "Confederation Park"
    city: "Calgary, AB"
    notes: "Evening walk, watched the sunset over the river"
  - name: "Rosso Coffee"
    city: "Calgary, AB"
    notes: "Productive writing session, americano"

quotes:
  - text: "We don't read and write poetry because it's cute. We read and write poetry because we are members of the human race."
    author: "N.H. Kleinbaum"
    source: "Dead Poets Society"
  - text: "The powerful play goes on, and you may contribute a verse."
    author: "Walt Whitman"
    source: "O Me! O Life!"

notes:
  - "Realized today that mise en place applies to more than cooking—it's about showing up prepared for whatever you're creating"
  - "The city feels different in January. Quieter. Like it's holding its breath between seasons"
---
```

---

## Component Specifications

### Homepage (index.njk)

**Layout:**
```
+----------------------------------+
| Daily Gratitude                  |
| log.brennan.day                  |
+----------------------------------+
|                                  |
| [Latest Post]                    |
| - Date                           |
| - All content blocks             |
|                                  |
+----------------------------------+
| January 2025                     |
| - 01 Jan: [preview]              |
| - 02 Jan: [preview]              |
| ...                              |
+----------------------------------+
| December 2024                    |
| ...                              |
+----------------------------------+
| [Archive by Year]                |
+----------------------------------+
```

**Features:**
- Shows full latest post at top
- Monthly sections with date + brief preview
- Collapsible year sections for older content
- Simple text navigation (no fancy UI)

### Post Display Component

```html
<article class="post">
  <time class="post-date">01 Jan 2025</time>
  
  <!-- Only show sections if data exists -->
  
  <div class="post-gratitude" data-type="gratitude">
    <span class="icon">🙏</span>
    <p>[gratitude text]</p>
  </div>
  
  <div class="post-books" data-type="books">
    <span class="icon">📚</span>
    <ul>
      <li>
        <cite>[title]</cite> by [author]
        <span class="meta">([status], p. [pages])</span>
      </li>
    </ul>
  </div>
  
  <div class="post-videos" data-type="videos">
    <span class="icon">📺</span>
    <ul>
      <li>
        <a href="[url]">[title]</a> by [creator]
        <span class="meta">([duration])</span>
      </li>
    </ul>
  </div>
  
  <div class="post-music" data-type="music">
    <span class="icon">🎵</span>
    <ul>
      <li>
        [title] — [artist]
        <span class="meta">([album], ×[plays])</span>
      </li>
    </ul>
  </div>
  
  <div class="post-locations" data-type="locations">
    <span class="icon">📍</span>
    <ul>
      <li>
        <strong>[name]</strong> ([city])
        <span class="notes">[notes]</span>
      </li>
    </ul>
  </div>
  
  <div class="post-quotes" data-type="quotes">
    <span class="icon">💬</span>
    <blockquote>
      <p>"[quote text]"</p>
      <footer>— [author], <cite>[source]</cite></footer>
    </blockquote>
  </div>
  
  <div class="post-notes" data-type="notes">
    <span class="icon">📝</span>
    <ul>
      <li>[note]</li>
    </ul>
  </div>
</article>
```

---

## CSS Specifications

### Base Styles (style.css)

```css
:root {
  --bg-primary: #282828;
  --bg-secondary: #3c3836;
  --fg-primary: #ebdbb2;
  --fg-dim: #a89984;
  --accent-gratitude: #fabd2f;
  --accent-books: #83a598;
  --accent-videos: #d3869b;
  --accent-music: #8ec07c;
  --accent-locations: #fe8019;
  --accent-quotes: #b8bb26;
  --accent-notes: #fb4934;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-primary);
  color: var(--fg-primary);
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  line-height: 1.6;
  padding: 20px;
}

/* Fixed width container */
.container {
  max-width: 600px;
  margin: 0 auto;
}

/* Header */
header {
  border-bottom: 2px solid var(--fg-dim);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--fg-dim);
  font-size: 0.875rem;
}

/* Post styles */
.post {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--bg-secondary);
}

.post-date {
  display: block;
  color: var(--fg-dim);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.post > div {
  margin-bottom: 1.5rem;
}

.icon {
  font-style: normal;
  margin-right: 0.5rem;
}

/* Type-specific colors */
[data-type="gratitude"] { border-left: 3px solid var(--accent-gratitude); padding-left: 1rem; }
[data-type="books"] { border-left: 3px solid var(--accent-books); padding-left: 1rem; }
[data-type="videos"] { border-left: 3px solid var(--accent-videos); padding-left: 1rem; }
[data-type="music"] { border-left: 3px solid var(--accent-music); padding-left: 1rem; }
[data-type="locations"] { border-left: 3px solid var(--accent-locations); padding-left: 1rem; }
[data-type="quotes"] { border-left: 3px solid var(--accent-quotes); padding-left: 1rem; }
[data-type="notes"] { border-left: 3px solid var(--accent-notes); padding-left: 1rem; }

/* Lists */
ul {
  list-style: none;
}

li {
  margin-bottom: 0.5rem;
}

li::before {
  content: "- ";
  color: var(--fg-dim);
}

/* Links */
a {
  color: var(--fg-primary);
  text-decoration: underline;
}

a:hover {
  color: var(--accent-books);
}

/* Metadata */
.meta {
  color: var(--fg-dim);
  font-size: 0.875rem;
}

/* Blockquotes */
blockquote {
  margin: 1rem 0;
  padding-left: 1rem;
  font-style: italic;
}

blockquote footer {
  font-style: normal;
  font-size: 0.875rem;
  color: var(--fg-dim);
  margin-top: 0.5rem;
}

/* Archive navigation */
.archive-month {
  margin-bottom: 2rem;
}

.archive-month h2 {
  font-size: 1.125rem;
  font-weight: normal;
  margin-bottom: 1rem;
  color: var(--fg-dim);
}

.archive-list {
  list-style: none;
}

.archive-list li::before {
  content: "";
}

.archive-list a {
  display: block;
  padding: 0.25rem 0;
  text-decoration: none;
}

.archive-list a:hover {
  text-decoration: underline;
}

/* Focus styles for accessibility */
*:focus {
  outline: 2px solid var(--accent-books);
  outline-offset: 2px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--bg-secondary);
  color: var(--fg-primary);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## Eleventy Configuration (.eleventy.js)

Note: Code might be bugged:

```javascript
module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateObj).toLocaleDateString('en-GB', options);
  });
  
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });
  
  // Group by month
  eleventyConfig.addCollection("byMonth", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");
    const byMonth = {};
    
    posts.forEach(post => {
      const date = new Date(post.data.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = {
          year: date.getFullYear(),
          month: date.toLocaleString('en-US', { month: 'long' }),
          posts: []
        };
      }
      
      byMonth[monthKey].posts.push(post);
    });
    
    return Object.values(byMonth).sort((a, b) => {
      return `${b.year}-${b.month}`.localeCompare(`${a.year}-${a.month}`);
    });
  });
  
  // Latest post
  eleventyConfig.addCollection("latest", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => b.date - a.date)
      .slice(0, 1);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Foreground (#ebdbb2) on Background (#282828): 11.13:1 ✓
- All accent colors tested against backgrounds for minimum 4.5:1 ratio

**Semantic HTML:**
- Proper heading hierarchy (h1 → h2 → h3)
- `<article>`, `<time>`, `<blockquote>`, `<cite>` elements
- Lists use proper `<ul>` / `<li>` structure

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators (2px outline)
- Logical tab order
- Skip-to-content link

**Screen Reader Support:**
- Meaningful alt text (no decorative emojis read aloud)
- ARIA labels where needed
- Proper semantic structure
- Date format: machine-readable + human-readable

**Testing Requirements:**
- Lighthouse accessibility score: 100
- axe DevTools: 0 violations
- Keyboard-only navigation test
- NVDA/JAWS screen reader test

---

## Build & Deployment

### package.json

```json
{
  "name": "commonplace",
  "version": "1.0.0",
  "description": "Daily gratitude and commonplace log",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "clean": "rm -rf _site"
  },
  "dependencies": {
    "@11ty/eleventy": "^2.0.0"
  }
}
```

### Deployment Target

**Host:** Netlify (recommended) or GitHub Pages  
**Domain:** log.brennan.day  
**Build Command:** `npm run build`  
**Publish Directory:** `_site`  

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "_site"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Workflow

### Daily Post Process

1. Create new file: `src/posts/YYYY-MM-DD.md` (template?)
2. Add frontmatter with date
3. Add any optional content blocks
4. Commit and push
5. Auto-deploys to log.brennan.day

### Example Quick Commit Script

```bash
#!/bin/bash
# add-post.sh

DATE=$(date +%Y-%m-%d)
YEAR=$(date +%Y)
MONTH=$(date +%m)
FILE="src/posts/$YEAR/$MONTH/$DATE.md"

mkdir -p "src/posts/$YEAR/$MONTH"

cat > "$FILE" << EOF
---
date: $DATE
gratitude: ""
---
EOF

echo "Created $FILE"
$EDITOR "$FILE"
```

---

## Future Enhancements (Optional)

### Phase 2 Features
- RSS feed generation
- Search functionality (static search index)
- Export to JSON/CSV
- Annual statistics page
- Reading progress tracking
- Location map (static SVG)

### Phase 3 Features
- Webmentions integration
- IndieAuth support
- POSSE syndication
- Photo uploads (optimized, lazy-loaded)

---

## Performance Targets

- **Time to First Byte:** < 200ms
- **First Contentful Paint:** < 1s
- **Total Page Weight:** < 50KB (HTML + CSS)
- **Lighthouse Performance Score:** > 95
- **Build Time:** < 30 seconds for 1000 posts

---

## Content Guidelines

### Writing Style
- Authentic, personal voice
- Present tense for gratitude
- Brief but meaningful
- No pressure for daily perfection

### Privacy Considerations
- No sensitive location details
- No personally identifying information about others
- Public-first mindset: "would I be okay with anyone reading this?"

### Consistency
- One post per day (can skip days)
- All fields optional
- Date is only required field
- Keep posts focused on observation rather than judgment
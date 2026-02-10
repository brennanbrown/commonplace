# 🏵️ Daily Gratitude // Commonplace Log

> An ultra-minimalist Eleventy microblog for tracking daily gratitude, media consumption, and commonplace thoughts.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![11ty](https://img.shields.io/badge/11ty-v2.0.1-blue)](https://www.11ty.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7)](https://www.netlify.com/)

## 📖 About

🏵️ This is a brutally simple 11ty microblog that helps you maintain a daily practice of gratitude and commonplace bookkeeping. It's designed to be:

- **Minimal**: No JavaScript frameworks, no CSS preprocessors, no build complexity
- **Fast**: Static HTML, minimal CSS, instant loads
- **Accessible**: WCAG 2.1 AA compliant, semantic HTML, keyboard navigation
- **Private**: Your data lives in markdown files on your own computer/GitHub
- **Extensible**: Track gratitude, weather, work published, books, videos, music, locations, quotes, and notes

## 🎨 Design Philosophy

Built with a brutalist aesthetic inspired by the Gruvbox Dark color palette:
- Fixed 600px container width
- Monospace font stack
- Color-coded content types
- No responsive design needed — simplicity works everywhere

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- Git (for tracking your entries)

### Installation

```bash
# Clone the repository
git clone https://github.com/brennanbrown/commonplace.git
cd commonplace

# Install dependencies
npm install

# Start the development server
npm run dev
```

Your site will be available at `http://localhost:8080/`

## 📝 Creating Entries

Each day's entry is a simple markdown file in `src/posts/`. The filename should be the date: `YYYY-MM-DD.md`.

Example entry (`src/posts/2025-01-01.md`):

```yaml
---
date: 2025-01-01
title: 1 Jan 2025
layout: ../_includes/post.njk
gratitude: "The silence of early morning before anyone else is awake is precious."

weather:
  condition: "Partly Cloudy"
  temp: "2°C"
  emoji: "⛅"

work_published:
  - title: "Finding Beauty in the Ordinary"
    type: "essay"
    url: "https://example.com/essay"
    publication: "Literary Journal"

books:
  - title: "The Dispossessed"
    author: "Ursula K. Le Guin"
    status: "reading"
    pages: 102

videos:
  - title: "Static Site Generators Explained"
    creator: "Fireship"
    url: "https://youtube.com/watch?v=example"
    duration: "12m"

music:
  - title: "Nightswimming"
    artist: "R.E.M."
    album: "Automatic for the People"
    plays: 3

locations:
  - name: "Central Park"
    city: "New York"
    notes: "First snow of the season"

quotes:
  - text: "The best time to plant a tree was 20 years ago. The second best time is now."
    author: "Chinese Proverb"
    source: "Traditional"

notes:
  - "Started tracking my reading progress more systematically"
  - "Need to remember to take breaks during long work sessions"
---
```

## 🎯 Content Types

All fields are optional. Include only what you want to track:

| Field | Type | Color | Icon |
|-------|------|-------|------|
| `gratitude` | Text | Yellow | 🙏 |
| `weather` | Object | Teal | 🌤️ |
| `work_published` | Array | Orange | ✍️ |
| `books` | Array | Blue | 📚 |
| `videos` | Array | Purple | 📺 |
| `music` | Array | Green | 🎵 |
| `locations` | Array | Red | 📍 |
| `quotes` | Array | Aqua | 💬 |
| `notes` | Array | Light Red | 📝 |

## 🏗️ Customization

### Site Configuration

Edit `src/_data/site.json`:

```json
{
  "title": "Your Title",
  "url": "https://yourdomain.com",
  "description": "Your description"
}
```

### Styling

The CSS uses CSS custom properties. Edit `src/css/style.css`:

```css
:root {
  --bg: #282828;      /* Background */
  --fg: #ebdbb2;      /* Text */
  --yellow: #fabd2f;  /* Gratitude */
  --teal: #7daea3;    /* Weather */
  --orange: #d79921;  /* Work Published */
  --blue: #83a598;    /* Books */
  --purple: #d3869b;  /* Videos */
  --green: #8ec07c;   /* Music */
  --red: #fe8019;     /* Locations */
  --aqua: #b8bb26;    /* Quotes */
  --light-red: #fb4934; /* Notes */
}
```

### Adding New Content Types

1. Add styling in `src/css/style.css`
2. Update the template in `src/_includes/post.njk`

## 📦 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically with the included `netlify.toml`

### Other Static Hosts

```bash
# Build the site
npm run build

# Deploy the _site folder
```

## 🔧 Configuration

### Eleventy Configuration

Key settings in `.eleventy.js`:

- **Date Handling**: All dates parsed as UTC to avoid timezone issues
- **Collections**: 
  - `latest`: Most recent post
  - `byMonth`: Posts grouped by month
- **Filters**: Custom date formatting for consistent display

### URL Structure

Posts use clean URLs without `/posts/` prefix:
- `https://yoursite.com/2025-01-01/`

Configure in `src/posts/posts.json`:
```json
{
  "permalink": "{{ page.fileSlug }}/"
}
```

## 🔄 Workflow Ideas

### Beeminder Integration

Use GitMinder to track daily commits:
1. Create a new goal in Beeminder
2. Connect your GitHub repository
3. Commit daily to stay on track

### RSS Feed

Your site includes an RSS feed at `/feed.xml` for subscribers.

### Social Sharing

Open Graph and Twitter Card tags included for better sharing.

## 🐛 Troubleshooting

### Common Issues

1. **Posts not appearing**: Check date format (YYYY-MM-DD)
2. **Wrong month in archives**: Ensure dates are parsed as UTC
3. **Blank post pages**: Verify `layout: ../_includes/post.njk` in frontmatter
4. **CSS not updating**: Increment version number in base.njk

### Debug Mode

Add debug output to templates:
```njk
DEBUG: {{ collections.latest | length }}
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [11ty](https://www.11ty.dev/) - The static site generator
- [Gruvbox](https://github.com/morhetz/gruvbox) - Color scheme
- [Beeminder](https://www.beeminder.com/) - Accountability system

## 📬 Support

- 🐛 [Report Issues](https://github.com/brennanbrown/commonplace/issues)
- 💡 [Feature Requests](https://github.com/brennanbrown/commonplace/discussions)
- 📧 [Email](mailto:brennan@brennan.day)

---

> "What are you grateful for today? And more importantly, how are you keeping track of it?"

Made with ❤️ by [Brennan Brown](https://brennan.day)
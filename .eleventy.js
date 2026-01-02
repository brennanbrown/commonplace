module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/images");
  
  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' };
    return new Date(dateObj).toLocaleDateString('en-GB', options);
  });
  
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });
  
  eleventyConfig.addFilter("date", (dateObj, format) => {
    let date;
    if (typeof dateObj === 'string') {
      date = new Date(dateObj + 'T00:00:00Z');
    } else {
      date = new Date(dateObj);
    }
    
    if (format === "%Y-%m") {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    if (format === "%Y-%m-%d") {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    if (format === "%d %b") {
      const options = { day: '2-digit', month: 'short', timeZone: 'UTC' };
      return date.toLocaleDateString('en-GB', options);
    }
    return date;
  });
  
  // Group by month
  eleventyConfig.addCollection("byMonth", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");
    const byMonth = {};
    
    posts.forEach(post => {
      // Skip posts without valid dates
      if (!post.data.date) {
        console.warn(`Post missing date: ${post.inputPath}`);
        return;
      }
      
      // Parse date as UTC to avoid timezone issues
      let date;
      if (typeof post.data.date === 'string') {
        // Split the date string to avoid timezone issues
        const [year, month, day] = post.data.date.split('-').map(Number);
        date = new Date(Date.UTC(year, month - 1, day));
      } else {
        date = post.data.date;
      }
      
      // Validate date
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date for post ${post.inputPath}: ${post.data.date}`);
        return;
      }
      
      // Use UTC methods to get the correct month and year
      const utcYear = date.getUTCFullYear();
      const utcMonth = date.getUTCMonth();
      const monthKey = `${utcYear}-${String(utcMonth + 1).padStart(2, '0')}`;
      
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = {
          year: utcYear,
          month: date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }),
          monthKey: monthKey,
          posts: []
        };
      }
      
      byMonth[monthKey].posts.push(post);
    });
    
    // Sort by monthKey (YYYY-MM) instead of month name
    return Object.values(byMonth).sort((a, b) => {
      return b.monthKey.localeCompare(a.monthKey);
    });
  });
  
  // Latest post
  eleventyConfig.addCollection("latest", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => {
        // Compare dates as strings to avoid timezone issues
        return String(b.data.date).localeCompare(String(a.data.date));
      })
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

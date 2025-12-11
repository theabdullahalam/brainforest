import path from "node:path";
import * as sass from "sass";
import { DateTime } from "luxon";
// import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static/fonts");
  eleventyConfig.addPassthroughCopy("static/icons");
  eleventyConfig.addPassthroughCopy("static/js");
  eleventyConfig.addPassthroughCopy("media");

  // sass
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function(inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => {
        return result.css;
      };
    },
  });

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLL dd, yyyy",
    );
  });

  // rss
 //  eleventyConfig.addPlugin(feedPlugin, {
	// 	type: "atom", 
	// 	outputPath: "/feed.xml",
	// 	collection: {
	// 		name: "note", 
	// 		limit: 20,   
	// 	},
	// 	metadata: {
	// 		language: "en",
	// 		title: "Abdullah's Notes",
	// 		subtitle: "My digital, public commonplace book",
	// 		base: "https://notes.theabdullahalam.com",
	// 		author: {
	// 			name: "Abdullah Alam",
	// 		}
	// 	}
	// });


  // absolute url
  eleventyConfig.addFilter("toAbsoluteUrl", (url) => {
    return new URL(url, "https://blog.theabdullahalam.com/").href
  })
}


/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
 *
 * We separate the category tags from the actual HTML for better separation, we can create the relationship in the tree
 */
export enum IHtmlCategoryTag {
  HtmlFlow = 'HtmlFlow',
  HtmlHeading = 'HtmlHeading',
  HtmlSectioning = 'HtmlSectioning',
  HtmlEmbedded = 'HtmlEmbedded',
  HtmlPhrasing = 'HtmlPhrasing',
  HtmlInteractive = 'HtmlInteractive',
  HtmlMetadata = 'HtmlMetadata',
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
 *
 * We separate the category tags from the actual HTML for better separation, we can create the relationship in the tree
 */
export enum IHtmlCategoryTag {
  HtmlEmbedded = 'HtmlEmbedded',
  HtmlFlow = 'HtmlFlow',
  HtmlHeading = 'HtmlHeading',
  HtmlInteractive = 'HtmlInteractive',
  HtmlMetadata = 'HtmlMetadata',
  HtmlPhrasing = 'HtmlPhrasing',
  HtmlSectioning = 'HtmlSectioning',
}

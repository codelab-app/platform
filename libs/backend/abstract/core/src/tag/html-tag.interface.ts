/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
 *
 * We separate the category tags from the actual HTML for better separation, we can create the relationship in the tree
 */
export enum HtmlCategoryTag {
  Heading = 'Heading',
  Sectioning = 'Sectioning',
  Embedded = 'Embedded',
  Phrasing = 'Phrasing',
  Interactive = 'Interactive',
  Metadata = 'Metadata',
}

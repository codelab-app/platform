export interface PageLinkProps {
  text: string | undefined | null
  page: string
}

/**
 * Link to a page
 */
export const PageLink = ({ text, page }: PageLinkProps) => {
  return <a href={page}>{text ?? ''}</a>
}

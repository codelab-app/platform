const Page = () => {
  const appId = 'e9ba90fa-973a-41ef-ad29-5c90ae8c8c7c'
  const localPreviewLink = `http://${appId}.codelab.test:3080/demo`

  return (
    <a href={localPreviewLink} rel="noopener noreferrer" target="_blank">
      Preview
    </a>
  )
}

export default Page

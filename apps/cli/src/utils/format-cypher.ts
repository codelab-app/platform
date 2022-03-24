/**
 * Taken from https://github.com/TristanPerry/cypher-query-formatter/blob/master/format.js
 */
export const formatCypher = (query: string) => {
  // a primitive regex approach, based loosely on the Cypher style guide at: https://neo4j.com/developer/cypher-style-guide/

  // "Keywords, similar to clauses, should be styled in all capital letters and are not case-sensitive, but do not need to be placed on a separate line."
  query = query.replace(
    /\b(WHEN|CASE|AND|OR|XOR|DISTINCT|AS|IN|STARTS WITH|ENDS WITH|CONTAINS|NOT|SET|ORDER BY)\b/gi,
    function (match) {
      return ' ' + match.toUpperCase().trim() + ' '
    },
  )

  // "The null value and boolean literals should be written in lower case in a query."
  query = query.replace(/\b(NULL|TRUE|FALSE)\b/gi, function (match) {
    return ' ' + match.toLowerCase().trim() + ' '
  })

  // Added negative lookbehind (?<!.), so we don't format something like apoc.coll.union, where union has a different meaning

  // Now ensure that all 'main' Cypher keywords are on a new line
  query = query.replace(
    /\b(?<!.)(CASE|DETACH DELETE|DELETE|MATCH|MERGE|LIMIT|OPTIONAL MATCH|RETURN|UNWIND|UNION|WHERE|WITH|GROUP BY)\b/gi,
    function (match) {
      // ".replace(/^\s+/,"")" removes whitespace from the start of the line (safer than using "trimStart()" right now)
      return '\n' + match.toUpperCase().replace(/^\s+/, '') + ' '
    },
  )

  // some whitespace clean-up
  query = query.replace(/^\s+/gm, '') // remove whitespace from start of lines

  query = query.replace(/\s+$/gm, '') // remove whitespace from end of lines

  // "One space after each comma in lists and enumerations."
  query = query.replace(/,([^\s])/g, function (match) {
    return ', ' + match.replace(/,/g, '')
  })

  query = query.replace(/ +/g, ' ') // replace multiple spaces with single space

  // "We can also make queries a bit easier to read by indenting ON CREATE or ON MATCH and any subqueries. Each of these blocks is indented with 2 spaces on a new line."
  query = query.replace(/\b(ON CREATE|ON MATCH)\b/gi, function (match) {
    return '\n  ' + match.toUpperCase().replace(/^\s+/, '') + ' '
  })
  query = query.replace(/ {([\S\s]*?)}/g, function (match) {
    const block = match
      .trim()
      .substring(1, match.trim().length - 1)
      .trim()

    return ' {\n  ' + block.replace(/(\r\n|\n|\r)/gm, '\n  ') + '\n}'
  })

  query = query.replace(/\n\s*\n/g, '\n') // remove multiple empty newlines

  return query.trim()
}

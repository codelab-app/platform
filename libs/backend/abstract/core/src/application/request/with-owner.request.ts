export interface WithOwnerRequest {
  owner: {
    /**
     * Take a subset of fields from JwtPayload
     *
     * Should rename these fields to domain specific terminology later on
     */
    sub: string
  }
}

export interface JwtEncrypter {
  encrypt: (plaintext: any) => Promise<string>
}

export interface JwtDecrypter {
  decrypt: (ciphertext: string) => any
}

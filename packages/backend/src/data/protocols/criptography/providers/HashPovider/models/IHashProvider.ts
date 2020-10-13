export default interface IHashProvider {
  generate(payload: string): Promise<string>
  compareHash(payload: string, hashed: string): Promise<boolean>
}

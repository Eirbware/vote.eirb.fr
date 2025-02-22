export interface IList {
  readonly _id: string;
  name: string;
  filename: string;
  site: string;
  trigram: string;
  votesCount?: number;
}

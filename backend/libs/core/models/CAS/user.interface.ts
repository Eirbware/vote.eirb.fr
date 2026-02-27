export interface CASUser {
  user: string;
  attributes: {
    courriel: string[];
    nom: string[];
    prenom: string[];
    ecole: string[];
		diplome: string[];
  };
}

export interface CASUser {
  user: string;
  attributes: {
    profil: string[];
    courriel: string[];
    nom: string[];
    prenom: string[];
    ecole: string[];
  };
}

enum UserRole {
  ADMIN = "ADMIN",
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum PersonalPronouns {
  SHE_HER = "SHE_HER",
  HE_HIM = "HE_HIM",
  THEY_THEM = "THEY_THEM",
}

interface Identity {
  name: string;
  surname: string;
  gender?: Gender;
  pronouns?: PersonalPronouns;
  imageUrl?: Url;
}

interface AccountData {
  id: string;
  identity: Identity;
  role?: UserRole;
}

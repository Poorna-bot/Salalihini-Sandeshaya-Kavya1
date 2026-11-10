export interface DeveloperLink {
  label: string;
  url: string;
}

export interface DeveloperInfo {
  name: string;
  contactUrl: string;
  contactLabel: string;
  repoUrl: string;
  sponsorUrl: string;
  links: DeveloperLink[];
}

export const DEVELOPER: DeveloperInfo = {
  name: "Poorna Thalisha",
  contactUrl: "",
  contactLabel: "",
  repoUrl: "https://github.com/Poorna-bot",
  sponsorUrl: "",
  links: [
    {
      label: "Source on GitHub",
      url: "https://github.com/Poorna-bot",
    },
  ],
};

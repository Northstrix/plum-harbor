export interface Language {
    code: string;
    name: string;
    flag: string;
  }
  
  export const languages: Language[] = [
    { code: 'en', name: 'English', flag: '/Flag_of_the_United_States.svg' },
    { code: 'he', name: 'עברית', flag: '/Flag_of_Israel.svg' },
    { code: 'es', name: 'Español', flag: '/Flag_of_Argentina.svg' },
    { code: 'gsw', name: 'Schwiizerdütsch', flag: '/Flag_of_Switzerland.svg' },
    { code: 'bar', name: 'Österreichisches Deutsch', flag: '/Flag_of_Austria.svg' },
    { code: 'de', name: 'Hochdeutsch', flag: '/Flag_of_Germany.svg' },
    { code: 'pt', name: 'Português Brasileiro', flag: '/Flag_of_Brazil.svg' },
  ];
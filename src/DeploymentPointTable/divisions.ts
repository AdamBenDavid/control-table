export const Divisions = {
    Ephraim: "אפרים",
    Binyamin: "בנימין",
    Yehuda: "יהודה",
    Etzion: "עציון",
    Menashe: "מנשה",
    Shomron: "שומרון",
    D417: "417",
} as const;

export type Division = typeof Divisions[keyof typeof Divisions];

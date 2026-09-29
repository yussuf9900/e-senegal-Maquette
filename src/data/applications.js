export const initialApplications = [
  {
    id: "ES-2026-001204",
    procedure: "residence",
    status: "COMPLEMENT_REQUIS",
    date: "2026-09-24T09:30:00",
    events: [
      {
        status: "SOUMIS",
        date: "2026-09-24T09:30:00",
        message: "Votre demande a bien été reçue.",
      },
      {
        status: "EN_ETUDE",
        date: "2026-09-25T10:15:00",
        message: "Le service examine votre dossier.",
      },
      {
        status: "COMPLEMENT_REQUIS",
        date: "2026-09-28T14:20:00",
        message: "Merci d’ajouter un justificatif de domicile lisible.",
      },
    ],
  },
  {
    id: "ES-2026-001198",
    procedure: "passeport",
    status: "EN_ETUDE",
    date: "2026-09-22T11:00:00",
    events: [
      {
        status: "SOUMIS",
        date: "2026-09-22T11:00:00",
        message: "Votre demande a bien été reçue.",
      },
      {
        status: "EN_ETUDE",
        date: "2026-09-23T15:00:00",
        message: "Le service examine votre dossier.",
      },
    ],
  },
  {
    id: "ES-2026-001162",
    procedure: "naissance",
    status: "VALIDE",
    date: "2026-09-18T08:45:00",
    events: [
      {
        status: "SOUMIS",
        date: "2026-09-18T08:45:00",
        message: "Votre demande a bien été reçue.",
      },
      {
        status: "EN_ETUDE",
        date: "2026-09-19T10:00:00",
        message: "Le service examine votre dossier.",
      },
      {
        status: "VALIDE",
        date: "2026-09-21T12:00:00",
        message: "Votre démarche est terminée.",
      },
    ],
  },
  {
    id: "ES-2026-001140",
    procedure: "fiscal",
    status: "REJETE",
    date: "2026-09-15T08:45:00",
    events: [
      {
        status: "SOUMIS",
        date: "2026-09-15T08:45:00",
        message: "Votre demande a bien été reçue.",
      },
      {
        status: "REJETE",
        date: "2026-09-17T12:00:00",
        message:
          "L’identifiant fiscal fourni ne correspond pas au dossier fictif.",
      },
    ],
  },
];

const hostURL = "https://localhost/openmrs/";
const RESTWS_V1 = "ws/rest/v1/";
export const ADMINISTRATED = "ADMINISTRATED",
    NOTADMINISTRATED = "NOTADMINISTRATED",
    SCHEDULED = "scheduled",
    MG = "MG", ML = "ML",
    CAP = "CAPSULES", TAB = "TABLETS",
    TBSP = "TABLESPOON", TSP = "TEASPOON",
    QD = "ONCE A DAY", BID = "TWICE A DAY",
    TID = "THRICE A DAY", QID = "FOUR TIMES A DAY",
    QOD = "ON ALTERNATE DAYS",
    SYMBOLSHEXCODE = {
      ADMINISTRATED: 0X2705,
      scheduled: 0X23F0,
      NOTADMINISTRATED: 0X26A0
    },
    START_OF_WEEK = 2,
    hostFullURL = hostURL + RESTWS_V1,
    ipdSchedulesUrl =hostFullURL+"ipd/schedules/"
;

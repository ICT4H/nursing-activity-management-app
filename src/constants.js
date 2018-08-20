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
    WeekDaysOptions = [{name: "MONDAY"}, {name: "TUESDAY"}, {name: "WEDNESDAY"}, {name: "THURSDAY"}, {name: "FRIDAY"}, {name: "SATURDAY"}, {name: "SUNDAY"}],
    START_OF_WEEK = 2,
    administrationScheduleDefinition = {
      "Twice a week": {
        "type": "weekly",
        "numberOfTimes": 2,
        "dosingTimesPerDay": 1
      },
      "Twice a week, 2 units": {
        "type": "weekly",
        "numberOfTimes": 2,
        "dosingTimesPerDay": 2
      },
      "Once in 2 months": {
        "type": "monthly",
        "dosingTimesPerDay": 1
      },
      "Once in 2 months, 3 units": {
        "type": "monthly",
        "dosingTimesPerDay": 3
      },
      "Four times a day": {
        "type": "daily",
        "dosingTimesPerDay": 4
      }
    },
    hostFullURL = hostURL + RESTWS_V1,
    ipdSchedulesUrl = hostFullURL + "ipd/schedules/",
    patientDetailsUrl = hostFullURL + "patient/",
    prescribedAndActiveDrugsUrl = hostFullURL + "bahmnicore/drugOrders/active",
    drugOrderConfigUrl = hostFullURL + "bahmnicore/config/drugOrders"
;

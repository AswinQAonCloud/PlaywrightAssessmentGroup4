import { toISO, fromToday } from '../utils/dateHelpers.js';

export const testData = {
  room: {
    roomNumber: '300',
    type:       'Single',
    accessible: 'true',
    price:      '100',
    total:      100, 
  },

  dates: {
    valid: {
      checkin:  toISO(fromToday(1)),
      checkout: toISO(fromToday(2)),    // 1 night
    },
    invalid: {
      checkin:  toISO(fromToday(3)),
      checkout: toISO(fromToday(1)),   // 3 nights
    },
    sameDay: {
      checkin:  toISO(fromToday(1)),
      checkout: toISO(fromToday(1)),   // 7 nights
    },
  },

  dates: {
  oneNight: getDateRange(1),
  threeNights: getDateRange(3),
  sevenNights: getDateRange(7),
},

  // Fees applied by the site on every booking
  fees: {
    cleaning: 25,
    service:  15,
  },
};

// Total price calculator for assertions in tests
export const expectedTotal = (nights, price, fees) =>
  Number(price) * nights + fees.cleaning + fees.service;
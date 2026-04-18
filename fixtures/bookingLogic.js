export const testData = {
  room: {
    roomNumber: '300',
    type: 'Single',
    accessible: 'true',
    price: '100'
  },

  validBooking: {
    firstname: 'Aswin',
    lastname: 'Kumar',
    email: 'aswin@test.com',
    phone: '9876543210'
  },

  invalidBooking: {
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  },

  dates: {
    valid: {
      checkin: '2026-04-18',
      checkout: '2026-04-19'
    },
    invalid: {
      checkin: '2026-04-20',
      checkout: '2026-04-18'
    },
    sameDay: {
      checkin: '2026-04-18',
      checkout: '2026-04-18'
    }
  }
};
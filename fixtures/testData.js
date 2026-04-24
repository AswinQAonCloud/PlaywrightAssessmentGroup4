export const testData = {
  room: {
    roomNumber: '',
    type: 'Single',
    accessible: 'true',
    price: '150',
  },


  validRoom: {
    roomNumber: '200',
    type: 'Single',
    accessible: 'true',
    price: '150',
  },


booking: {
    price: '250'   //
  },


reserve:{
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  phone: '1234567890',


},


errors: {
    bookingForm: [
      'must not be empty',
      'size must be between 11 and 21',
      'size must be between 3 and 30',
      'size must be between 3 and 18',
      'Lastname should not be blank',
      'Firstname should not be blank'
    ]
  },


   message: {
    name: 'James Dean',
    subject: 'Booking enquiry'
  }


 
  }
